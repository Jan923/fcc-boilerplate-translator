const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

const Translator = require('../components/translator.js');
let translator = new Translator();

suite('Unit Tests', () => {

suite('Translate American to British', () => {

  test('Translate Mangoes are my favorite fruit.', function(done){
      assert.equal(translator.translate(
      'Mangoes are my favorite fruit.', 
      'american-to-british'), 
      'Mangoes are my <span class="highlight">favourite</span> fruit.'
      );
    done();
  })

  test('Translate I ate yogurt for breakfast.', function(done){
    assert.equal(translator.translate(
      'I ate yogurt for breakfast.', 
      'american-to-british'), 
      'I ate <span class="highlight">yoghurt</span> for breakfast.'
      );
    done();
  })

  test("Translate We had a party at my friend's condo.", function(done){
    assert.equal(translator.translate(
      "We had a party at my friend's condo.", 
      'american-to-british'), 
      `We had a party at my friend's <span class="highlight">flat</span>.`
      );
    done();
  })

  test("Translate Can you toss this in the trashcan for me?", function(done){
    assert.equal(translator.translate(
      'Can you toss this in the trashcan for me?', 
      'american-to-british'), 
      `Can you toss this in the <span class="highlight">bin</span> for me?`
      );
    done();
  })

  test("Translate The parking lot was full.", function(done){
    assert.equal(translator.translate(
      'The parking lot was full.', 
      'american-to-british'), 
      `The <span class="highlight">car park</span> was full.`
      );
    done();
  })

  test("Translate Like a high tech Rube Goldberg machine.", function(done){
    assert.equal(translator.translate(
      'Like a high tech Rube Goldberg machine.', 
      'american-to-british'), 
      `Like a high tech <span class="highlight">Heath Robinson device</span>.`
      );
    done();
  })

  test("Translate To play hooky means to skip class or work.", function(done){
    assert.equal(translator.translate(
      'To play hooky means to skip class or work.', 
      'american-to-british'), 
      `To <span class="highlight">bunk off</span> means to skip class or work.`
      );
    done();
  })

  test("Translate No Mr. Bond, I expect you to die.", function(done){
    assert.equal(translator.translate(
      'No Mr. Bond, I expect you to die.', 
      'american-to-british'), 
      `No <span class="highlight">Mr</span> Bond, I expect you to die.`
      );
    done();
  })

  test("Dr. Grosh will see you now.", function(done){
    assert.equal(translator.translate(
      'Dr. Grosh will see you now.', 
      'american-to-british'), 
      `<span class="highlight">Dr</span> Grosh will see you now.`
      );
    done();
  })

  test("Lunch is at 12:15 today.", function(done){
    assert.equal(translator.translate(
      'Lunch is at 12:15 today.', 
      'american-to-british'), 
      `Lunch is at <span class="highlight">12.15</span> today.`
      );
    done();
  })

})
  
suite('Translate British to American', () => {

  test("We watched the footie match for a while.", function(done){
    assert.equal(translator.translate(
      'We watched the footie match for a while.', 
      'british-to-american'), 
      `We watched the <span class="highlight">soccer</span> match for a while.`
      );
    done();
  })

  test("Paracetamol takes up to an hour to work.", function(done){
    assert.equal(translator.translate(
      'Paracetamol takes up to an hour to work.', 
      'british-to-american'), 
      `<span class="highlight">Tylenol</span> takes up to an hour to work.`
      );
    done();
  })

  test("First, caramelise the onions.", function(done){
    assert.equal(translator.translate(
      'First, caramelise the onions.', 
      'british-to-american'), 
      `First, <span class="highlight">caramelize</span> the onions.`
      );
    done();
  })

  test("I spent the bank holiday at the funfair.", function(done){
    assert.equal(translator.translate(
      'I spent the bank holiday at the funfair.', 
      'british-to-american'), 
      `I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.`
      );
    done();
  })

  test("I had a bicky then went to the chippy.", function(done){
    assert.equal(translator.translate(
      'I had a bicky then went to the chippy.', 
      'british-to-american'), 
      `I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.`
      );
    done();
  })

  test("I've just got bits and bobs in my bum bag.", function(done){
    assert.equal(translator.translate(
      "I've just got bits and bobs in my bum bag.", 
      'british-to-american'), 
      `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`
      );
    done();
  })

  test("The car boot sale at Boxted Airfield was called off.", function(done){
    assert.equal(translator.translate(
      "The car boot sale at Boxted Airfield was called off.", 
      'british-to-american'), 
      `The <span class="highlight">swap meet</span> at Boxted Airfield was called off.`
      );
    done();
  })

  test("Have you met Mrs Kalyani?", function(done){
    assert.equal(translator.translate(
      "Have you met Mrs Kalyani?", 
      'british-to-american'), 
      `Have you met <span class="highlight">Mrs.</span> Kalyani?`
      );
    done();
  })

  test("Prof Joyner of King's College, London.", function(done){
    assert.equal(translator.translate(
      "Prof Joyner of King's College, London.", 
      'british-to-american'), 
      `<span class="highlight">Prof.</span> Joyner of King's College, London.`
      );
    done();
  })

  test("Tea time is usually around 4 or 4.30.", function(done){
    assert.equal(translator.translate(
      "Tea time is usually around 4 or 4.30.", 
      'british-to-american'), 
      `Tea time is usually around 4 or <span class="highlight">4:30</span>.`
      );
    done();
  })
  
})

suite('Highlight translation', () => {

  test("Mangoes are my favorite fruit.", function(done){
    assert.equal(translator.translate(
      "Mangoes are my favorite fruit.", 
      'american-to-british'), 
      `Mangoes are my <span class="highlight">favourite</span> fruit.`
      );
    done();
  })

  test("I ate yogurt for breakfast.", function(done){
    assert.equal(translator.translate(
      "I ate yogurt for breakfast.", 
      'american-to-british'), 
      `I ate <span class="highlight">yoghurt</span> for breakfast.`
      );
    done();
  })

  test("We watched the footie match for a while.", function(done){
    assert.equal(translator.translate(
      "We watched the footie match for a while.", 
      'british-to-american'), 
      `We watched the <span class="highlight">soccer</span> match for a while.`
      );
    done();
  })

  test("Paracetamol takes up to an hour to work.", function(done){
    assert.equal(translator.translate(
      "Paracetamol takes up to an hour to work.", 
      'british-to-american'), 
      `<span class="highlight">Tylenol</span> takes up to an hour to work.`
      );
    done();
  })

})

});
