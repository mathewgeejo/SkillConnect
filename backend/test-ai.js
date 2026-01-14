/**
 * AI Service Test Script
 * Run this to test the AI recommendation system
 */

import aiService from './services/ai.service.js';

console.log('🧪 Testing AI Recommendation System...\n');

async function testAIService() {
  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing AI Service Configuration...');
    const client = aiService.getClient();
    console.log('✅ Groq client initialized successfully\n');

    // Test 2: Simple Chat
    console.log('2️⃣ Testing AI Chat...');
    const chatResponse = await aiService.chat(
      'Hello, what can you help me with?',
      'test-conversation',
      'worker'
    );
    console.log('✅ Chat Response:', chatResponse.substring(0, 100) + '...\n');

    // Test 3: Text Enhancement
    console.log('3️⃣ Testing Text Enhancement...');
    const enhanced = await aiService.enhanceText(
      'Need someone for plumbing work at my house',
      'jobDescription'
    );
    console.log('✅ Enhanced Text:', enhanced.substring(0, 100) + '...\n');

    // Test 4: Skill Recommendations
    console.log('4️⃣ Testing Skill Gap Analysis...');
    const skillGap = await aiService.analyzeSkillGap(
      ['Basic Plumbing', 'Pipe Fitting'],
      'Master Plumber'
    );
    console.log('✅ Skill Gap Analysis:', 
      JSON.stringify(skillGap, null, 2).substring(0, 200) + '...\n');

    // Test 5: Salary Estimation
    console.log('5️⃣ Testing Salary Estimation...');
    const salary = await aiService.estimateSalary(
      'Electrician',
      ['Wiring', 'Installation', 'Maintenance'],
      5,
      'Kochi'
    );
    console.log('✅ Salary Estimate:', 
      JSON.stringify(salary, null, 2).substring(0, 200) + '...\n');

    console.log('🎉 All AI Service Tests Passed!\n');
    console.log('AI Recommendation System is properly configured and working.');
    
  } catch (error) {
    console.error('❌ Test Failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Check if GROQ_API_KEY is set in .env file');
    console.error('2. Verify API key at https://console.groq.com/keys');
    console.error('3. Ensure you have internet connection');
    process.exit(1);
  }
}

testAIService();
