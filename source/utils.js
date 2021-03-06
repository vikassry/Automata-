var _ = require("lodash");

var doIntersect = function (final_state_candidates, final_states){
		return isNotEmpty(_.intersection(final_state_candidates, final_states));
};

var isSubsetOf = function (subset_candidate, superSet){
		return subset_candidate.every(function(element){
			return contains(element, superSet);
	});
};

var isValidString = function (input, all_alphabets){
		var input_alphabets =  (Array.isArray(input)) ? input : input.split('');
		return isSubsetOf(input_alphabets, all_alphabets);
};

var isValidTransitionFunction = function (delta, states){
		return isSubsetOf(Object.keys(delta), states);
};

var isValidFinalStates = function (final_states, states){
		return (final_states.length) ? isSubsetOf(final_states, states) : false;
};

var isInitialStateValid = function (initial_state, states){
		return contains(initial_state, states);
}

var isEmpty = function (array) {
		return array.length == 0;
};

var isNotEmpty = function (array) {
		return !isEmpty(array);
};

var contains = function (element, array) {
		return array.indexOf(element) > -1;
};

var validateTuple = function (input_text, states, alphabets, delta, initial_state, final_states){
		if(!isValidString(input_text, alphabets))
				throw ("Invalid Input String!! Please use ("+ alphabets.join(",")+ ") only");
		if(!isInitialStateValid(initial_state, states))
				throw ("Invalid Initial State!!");
		if(!isValidTransitionFunction(delta, states))
				throw ("Invalid Transition Function!!");
		if(!isValidFinalStates(final_states, states))
			throw ("Invalid Final states!!");
};


exports.isEmpty = isEmpty;
exports.isNotEmpty = isNotEmpty;
exports.contains = contains;
exports.isSubsetOf = isSubsetOf;
exports.validateTuple = validateTuple;
exports.doIntersect = doIntersect;
