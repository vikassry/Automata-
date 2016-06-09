var assert = require('chai').assert;
var NFA_Generator = require('../source/NFA_Generator').NFA_Generator;

describe('NFA Generator', function() {
    describe('language w | w is string with length divisible by 2', function () {
        var lang = {
            states: ["q1","q2","q3"],
            alphabets : ['0','1'],
            transition_function:{
              'q1': {0:['q2'], 1:['q2']},
              'q2': {0:['q3'], 1:['q3']},
              'q3': {0:['q2'], 1:['q2']}
            },
            initial_state:"q1",
            final_states:['q1','q3']
        };
        var dfa_for_even_string_length = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should accept string 00', function () {
            assert.equal(dfa_for_even_string_length('00'), true);
        });
        it('should accept empty string', function () {
            assert.ok(dfa_for_even_string_length(''));
        });
        it('should accept even length of string', function () {
            assert.ok(dfa_for_even_string_length('010110'));
        });
        it('should not accept single character', function () {
            assert.notOk(dfa_for_even_string_length('0'));
        });
        it('should not accept odd length of character', function () {
            assert.notOk(dfa_for_even_string_length('10101'));
        });
    });

    describe('language w | w is string with length divisible by 2 or 3', function () {
        var lang = {
            states: ["q1","q2","q3","q4","q5","q6"],
            alphabets : ['0','1'],
            transition_function:{
              'q1': {0:['q2','q3'], 1:['q2','q3']},
              'q2': {0:['q4'], 1:['q4']},
              'q3': {0:['q5'], 1:['q5']},
              'q4': {0:['q2'], 1:['q2']},
              'q5': {0:['q6'], 1:['q6']},
              'q6': {0:['q3'], 1:['q3']}
            },
            initial_state:"q1" ,
            final_states:['q1','q4','q6']
        };
        var dfa_for_string_length_divisible_by_2_or_3 = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should accept string with length 2', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('00'));
        });
        it('should accept string with length 3', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('010'));
        });
        it('should accept empty string', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3(''));
        });
        it('should accept string with length divisible by both 2 & 3', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('101010'));
        });
        it('should not accept string with length neither divisible by 2 nor 3', function () {
            assert.notOk(dfa_for_string_length_divisible_by_2_or_3('1'))
            assert.notOk(dfa_for_string_length_divisible_by_2_or_3('10101'));
        });
    });

    describe('language w | w is string with length divisible by 2 or 3 | epsilon at entry', function () {
        var lang = {
            states: ["q1","q2","q3","q4","q5","q6"],
            alphabets : ['0','1'],
            transition_function:{
              'q1': {'ε':['q2','q3']},
              'q2': {0:['q4'], 1:['q4']},
              'q3': {0:['q5'], 1:['q5']},
              'q4': {0:['q2'], 1:['q2']},
              'q5': {0:['q6'], 1:['q6']},
              'q6': {0:['q3'], 1:['q3']}
            },
            initial_state:"q1",
            final_states:['q2','q3']
        };
        var dfa_for_string_length_divisible_by_2_or_3 = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should accept string with length 2', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('00'));
        });
        it('should accept string with length 3', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('010'));
        });
        it('should accept empty string', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3(''));
        });
        it('should accept string with length divisible by both 2 & 3', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('101010'));
        });
        it('should not accept string with length neither divisible by 2 nor 3', function () {
            assert.notOk(dfa_for_string_length_divisible_by_2_or_3('1'))
            assert.notOk(dfa_for_string_length_divisible_by_2_or_3('10101'));
        });
    });

    describe('language w | w is string with length divisible by 2 or 3 |epsilon at end', function () {
        var lang = {
            states: ["q1","q2","q3","q4","q5","q6","q7","q8","q9","q10"],
            alphabets : ['0','1'],
            transition_function:{
              'q1': {0:['q2','q3'], 1:['q2','q3']},
              'q2': {0:['q4'], 1:['q4']},
              'q3': {0:['q5'], 1:['q5']},
              'q4': {0:['q2','q7'], 1:['q2'], 'ε':['q8']},
              'q5': {0:['q6'], 1:['q6']},
              'q6': {0:['q3'], 1:['q3'], 'ε':['q9','q10']}
            },
            initial_state:"q1",
            final_states:['q1','q8','q9','q10']
        };
        var dfa_for_string_length_divisible_by_2_or_3 = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should accept string with length 2', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('00'));
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('0011'));
        });
        it('should accept string with length 3', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('010'));
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('101011010'));
        });
        it('should accept empty string', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3(''));
        });
        it('should accept string with length divisible by both 2 & 3', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('101010'));
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('101010101010'));
        });
        it('should not accept string with length neither divisible by 2 nor 3', function () {
            assert.notOk(dfa_for_string_length_divisible_by_2_or_3('1'))
            assert.notOk(dfa_for_string_length_divisible_by_2_or_3('10101'));
        });
    });
    describe('language w | w is string that ends with 101', function () {
        var lang = {
            states: ["q1", "q2", "q3", "q4"],
            alphabets: ["1", "0"],
            transition_function: {
              "q1": {"0": ["q1"], "1": ["q1", "q2"]},
              "q2": {"0": ["q3"]},
              "q3": {"1": ["q4"]}
            },
            initial_state: "q1",
            final_states: ["q4"]
        };
        var nfa = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should not accept empty string', function () {
            assert.notOk(nfa(""));
        });
        it('should accept string 101', function () {
            assert.ok(nfa("101"));
        });
        it('should accept accept string ending with 101', function () {
            assert.ok(nfa("10101"));
        });
        it('should not accept string not ending with 101', function () {
            assert.notOk(nfa("01"));
            assert.notOk(nfa("01011"));
        });
    });

    describe('language w | w is string contains with an even number of 1s or even number of 0s', function () {
      var lang = {
          states: ["q1", "q2", "q3", "q4", "q5"],
          alphabets: ["1", "0", "ε"],
          transition_function: {
            "q1": {"ε": ["q2", "q4"]},
            "q2": {"0": ["q3"], "1": ["q2"]},
            "q3": {"0": ["q2"], "1": ["q3"]},
            "q4": {"0": ["q4"], "1": ["q5"]},
            "q5": {"0": ["q5"], "1": ["q4"]}
          },
          initial_state: "q1",
          final_states: ["q2", "q4"]
      };
      var nfa = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

      it('should accept string contains with an even number of 1s or os', function () {
          assert.ok(nfa("11"));
          assert.ok(nfa("010"));
          assert.ok(nfa("11110"));
      });
      it('should accept empty string', function () {
          assert.ok(nfa(""));
      });
      it('should not accept string containing odd number of 0s or 1s', function () {
          assert.notOk(nfa("010101"));
      });
      it('should not accept string containing even number of neither 1s nor 0s', function () {
          assert.notOk(nfa("01"));
      });
    });

    describe('language w | w is string that ends with 0', function () {
      var lang = {
          "states": ["q1", "q2", "q3", "q4"],
          "alphabets": ["0", "1", "ε"],
          "transition_function": {
              "q1": {"ε": ["q2"]},
              "q2": {"ε": ["q3"]},
              "q3": {"0": ["q3", "q4"], "1": ["q3"]}
          },
          "initial_state": "q1",
          "final_states": ["q4"]

      };
      var nfa = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

      it('should accept 0', function () {
          assert.notOk(nfa("11"));
          assert.ok(nfa("00"));
          assert.ok(nfa("01110"));
      });
      it('should accept string ending with 0', function () {
          assert.ok(nfa("00"));
          assert.ok(nfa("01110"));
      });
      it('should not accept string not ending with 0', function () {
          assert.notOk(nfa("11"));
          assert.notOk(nfa("011"));
      });
    });

    describe('Language w | w is string that satisfies (aaa)* ∪ b(ab)*', function () {
        var lang = {
            states: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14", "q15"],
            alphabets: ['a', 'b'],
            transition_function: {
              'q1': {'ε': ['q2', 'q9']},
              'q2': {'ε': ['q3']},
              'q3': {'a': ['q4']},
              'q4': {'ε': ['q5']},
              'q5': {'a': ['q6']},
              'q6': {'ε': ['q7']},
              'q7': {'a': ['q8']},
              'q8': {'ε': ['q3']},
              'q9': {'b': ['q10']},
              'q10': {'ε': ['q11']},
              'q11': {'ε': ['q12']},
              'q12': {'a': ['q13']},
              'q13': {'ε': ['q14']},
              'q14': {'b': ['q15']},
              'q15': {'ε': ['q12']}
            },
            initial_state: "q1",
            final_states: ['q2', 'q8', 'q11', 'q15']
        };
        var nfa = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should accept empty string', function () {
          assert.ok(nfa(''));
        });
        it('should accept b', function () {
          assert.ok(nfa('b'));
        });
        it('should accept any number of aaa (triple a)', function () {
          assert.ok(nfa('aaa'));
          assert.ok(nfa('aaaaaaaaa'));
        });
        it('should accept b follwed by any number of ab', function () {
          assert.ok(nfa("bab"));
          assert.ok(nfa("babababab"));
        });
        it('should not accept string with number of a not divisible by 3 ', function () {
          assert.notOk(nfa('aaaaaaa'));
        });
        it('should not accept string b not followed by ab', function () {
          assert.notOk(nfa('baba'));
        });
        it('should not accept string aaa followed by ab or b', function () {
          assert.notOk(nfa('aaaab'));
          assert.notOk(nfa('aaab'));
        });
    });

    describe('Language w | w is string that satisfies (ab ∪ ba)*', function () {
        var lang = {
            states: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"],
            alphabets: ['a', 'b'],
            transition_function: {
            'q1': {'ε': ['q2']},
            'q2': {'ε': ['q3', 'q7']},
            'q3': {'a': ['q4']},
            'q4': {'ε': ['q5']},
            'q5': {'b': ['q6']},
            'q6': {'ε': ['q2']},
            'q7': {'b': ['q8']},
            'q8': {'ε': ['q9']},
            'q9': {'a': ['q10']},
            'q10': {'ε': ['q2']}
            },
            initial_state: "q1",
            final_states: ['q1', 'q6', 'q10']
        };
        var nfa = NFA_Generator(lang.states, lang.alphabets, lang.transition_function, lang.initial_state, lang.final_states);

        it('should accept empty string', function () {
            assert.ok(nfa(''));
        });
        it('should accept ab', function () {
            assert.ok(nfa('ab'));
        });
        it('should accept ba', function () {
            assert.ok(nfa('ba'));
        });
        it('should accept alternate ab combination', function () {
            assert.ok(nfa('ababababab'));
        });
        it('should accept alternate ba combination', function () {
            assert.ok(nfa("babababa"));
        });
        it('should not accept only one character', function () {
            assert.notOk(nfa('aaaaaaaaa'));
        });
    });

});
