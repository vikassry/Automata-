var util = require('./utils.js');
var validateTuple = util.validateTuple;
var contains = util.contains;

var DFA_Generator = function (states, alphabets, transition_function, initial_state, final_states){
		return function(input_text){
				validateTuple(input_text, states, alphabets, transition_function, initial_state, final_states);
				var state_for_input_string = resolveState(input_text, transition_function, initial_state);
				return contains(final_states, state_for_input_string);
		}
};

var resolveState = function(input_text, transition_function, initial_state){
		return input_text.split('').reduce(function(state, alphabet){
				return transition_function[state][alphabet];
		}, initial_state);
};

module.exports = DFA_Generator;
