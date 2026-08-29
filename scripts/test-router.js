require('dotenv').config();
const http = require('http');
const app = require('../src/server');

const TEST_PORT = process.env.PORT || 3000;
let serverInstance = null;

async function startServer() {
  return new Promise((resolve) => {
    serverInstance = app.listen(TEST_PORT, () => {
      console.log(`\n🧪 Test server started on http://localhost:${TEST_PORT}\n`);
      resolve();
    });
  });
}

async function stopServer() {
  if (serverInstance) {
    if (typeof serverInstance.closeAllConnections === 'function') {
      serverInstance.closeAllConnections();
    }
    await new Promise((resolve) => serverInstance.close(resolve));
    console.log('\n🛑 Test server stopped.\n');
  }
}


async function makeRequest(path, method = 'GET', body = null, headers = {}) {
  const url = `http://localhost:${TEST_PORT}${path}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('text/event-stream')) {
    const text = await res.text();
    return { status: res.status, headers: res.headers, text };
  }
  const data = await res.json();
  return { status: res.status, headers: res.headers, data };
}

async function runTests() {
  console.log('================================================================');
  console.log('  VOICE AI BACKEND & LLM FALLBACK ROUTER TEST SUITE');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    await startServer();

    // -------------------------------------------------------------
    // PART A: BOOKING API TESTS
    // -------------------------------------------------------------
    console.log('\n--- [TEST SUITE 1] Booking API ---');
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const testDate = `2026-11-${Math.floor(10 + Math.random() * 18)}`;
    const testTime = `${Math.floor(10 + Math.random() * 12)}:${Math.floor(10 + Math.random() * 50)}`;
    const testUserName = `Test User ${randomId}`;


    // 1. Initial Availability Check
    console.log(`1. Checking initial availability for ${testDate} @ ${testTime}...`);
    const check1 = await makeRequest('/check-availability', 'POST', { date: testDate, time: testTime });
    assert(check1.status === 200, `POST /check-availability returned status 200`);
    console.log(`   Result: available = ${check1.data.available}`);

    // 2. Book the appointment
    console.log(`2. Booking appointment for ${testUserName} on ${testDate} @ ${testTime}...`);
    const bookRes = await makeRequest('/book-appointment', 'POST', {
      name: testUserName,
      date: testDate,
      time: testTime,
      reason: 'Dental Consultation'
    });
    assert(bookRes.status === 201, `POST /book-appointment returned 201 Created`);
    assert(bookRes.data.success === true, `Booking success is true`);
    assert(bookRes.data.booking?.id !== undefined, `Booking ID generated`);

    // 3. Check availability again (should be false now)
    console.log(`3. Re-checking availability for ${testDate} @ ${testTime} (should now be booked)...`);
    const check2 = await makeRequest('/check-availability', 'POST', { date: testDate, time: testTime });
    assert(check2.data.available === false, `Slot is now marked unavailable`);

    // 4. Duplicate booking attempt (should return 409 conflict)
    console.log(`4. Attempting duplicate booking for the same slot...`);
    const dupRes = await makeRequest('/book-appointment', 'POST', {
      name: 'Bob Jones',
      date: testDate,
      time: testTime,
      reason: 'Cleaning'
    });
    assert(dupRes.status === 409, `Duplicate booking returned 409 Conflict`);
    assert(dupRes.data.success === false, `Duplicate booking response success is false`);

    // 5. Get all bookings
    console.log(`5. Fetching all bookings list via GET /bookings...`);
    const allBookings = await makeRequest('/bookings', 'GET');
    assert(allBookings.status === 200, `GET /bookings returned 200 OK`);
    assert(Array.isArray(allBookings.data), `Bookings is an array`);
    assert(allBookings.data.some(b => b.name === testUserName), `Contains ${testUserName}'s booking`);


    // -------------------------------------------------------------
    // PART B: LLM FALLBACK ROUTER TESTS
    // -------------------------------------------------------------
    console.log('\n--- [TEST SUITE 2] LLM Fallback Router ---');

    // Test 1: Standard Chat Completion
    console.log('1. Testing standard POST /v1/chat/completions (OpenAI compatible)...');
    const chatRes = await makeRequest('/v1/chat/completions', 'POST', {
      messages: [
        { role: 'system', content: 'You are an upbeat voice receptionist. Answer in 1 short sentence.' },
        { role: 'user', content: 'Hello! What are your business hours?' }
      ]
    });
    assert(chatRes.status === 200, `Chat completions returned 200 OK`);
    assert(chatRes.data.choices && chatRes.data.choices.length > 0, `Returned OpenAI-compatible choices array`);
    const assistantMessage = chatRes.data.choices?.[0]?.message?.content || '';
    console.log(`   🤖 Assistant Response: "${assistantMessage.trim()}"`);
    console.log(`   🏷️  Provider: ${chatRes.headers.get('x-llm-provider')}, Model: ${chatRes.headers.get('x-llm-model')}`);

    // Test 2: Fallback Simulation (Groq Model 1 fails -> Fallback to Groq Model 2 or Gemini)
    console.log('\n2. Testing Fallback Cascade (Simulating invalid primary model)...');
    const fallbackPipeline = [
      { provider: 'groq', model: 'invalid-deprecated-model-999' },
      { provider: 'groq', model: 'llama-3.3-70b-versatile' },
      { provider: 'gemini', model: 'gemini-2.0-flash' }
    ];

    const fallbackRes = await makeRequest('/v1/chat/completions', 'POST', {
      messages: [
        { role: 'user', content: 'Say "Fallback verified!" in exactly two words.' }
      ],
      _pipeline: fallbackPipeline
    });
    assert(fallbackRes.status === 200, `Fallback response returned 200 OK`);
    assert(fallbackRes.headers.get('x-fallback-occurred') === 'true', `Fallback flag correctly set to true`);
    console.log(`   🤖 Fallback Response: "${fallbackRes.data.choices?.[0]?.message?.content?.trim()}"`);
    console.log(`   🏷️  Handled by fallback provider: ${fallbackRes.headers.get('x-llm-provider')} (${fallbackRes.headers.get('x-llm-model')})`);

    // Test 3: Complete Outage Simulation (All models fail -> Graceful Assistant Text)
    console.log('\n3. Testing Total Provider Outage Simulation (Graceful Voice AI Recovery)...');
    const brokenPipeline = [
      { provider: 'groq', model: 'invalid-model-1' },
      { provider: 'groq', model: 'invalid-model-2' },
      { provider: 'gemini', model: 'invalid-gemini-model' }
    ];

    const gracefulRes = await makeRequest('/v1/chat/completions', 'POST', {
      messages: [
        { role: 'user', content: 'Are you there?' }
      ],
      _pipeline: brokenPipeline
    });
    assert(gracefulRes.status === 200, `Graceful fallback returned 200 OK without crashing`);
    const gracefulText = gracefulRes.data.choices?.[0]?.message?.content || '';
    assert(gracefulText.includes('trouble connecting'), `Contains graceful customer recovery message`);
    console.log(`   🛡️  Graceful Recovery Output: "${gracefulText}"`);

    // Test 4: Streaming Chat Completion (SSE)
    console.log('\n4. Testing SSE Streaming (stream: true)...');
    const streamRes = await makeRequest('/v1/chat/completions', 'POST', {
      messages: [
        { role: 'user', content: 'Count to 3.' }
      ],
      stream: true
    });
    assert(streamRes.status === 200, `Stream returned 200 OK`);
    assert(streamRes.text.includes('data:'), `Received SSE data stream chunks`);
    assert(streamRes.text.includes('[DONE]'), `Received terminal [DONE] event`);
    console.log(`   ⚡ Streaming chunks successfully validated.`);

  } catch (err) {
    console.error('Test execution error:', err);
    failed++;
  } finally {
    await stopServer();

    console.log('================================================================');
    console.log(`  TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('================================================================\n');

    if (failed > 0) {
      process.exitCode = 1;
    }
  }
}

runTests();

