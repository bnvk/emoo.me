// Emoome Settings
var EmoomeSettings = Backbone.Model.extend({
	type_colors	: {
		"emotional": "#ff0000",
		"intellectual": "#142bd7",
		"descriptive": "#dcca07",
		"sensory": "#0aa80e",
		"action": "#ee9700",
		"physical": "#cf00ee",
		"undecided": "#c3c3c3"
	},
	word_types : {
		"E":"emotional",
		"I":"intellectual",
		"D":"descriptive",
		"S":"sensory",
		"A":"action",
		"P":"physical",
		"U":"undecided"
	},
	types_count : {
		"E":0,"I":0,"D":0,"S":0,"A":0,"P":0,"U":0
	},
	word_types_sub : {
		"M":"moral",
		"S":"slang",
		"P":"perception",
		"Y":"psychological",
		"L":"feeling",
		"F":"food",
		"C":"common",
		"U":"undecided"
	},
	types_sub_count	: {
		"M":0,"S":0,"P":0,"Y":0,"L":0,"F":0,"C":0
	},
	core_emotions : {
		"10":"joy",
		"9":"happy",
		"8":"amazement",
		"7":"serenity",
		"6":"interest",
		"5":"optimism",
		"4":"happy",
		"3":"goofy",
		"2":"acceptance",
		"1":"surprise",
		"0":"neutral",
		"-1":"annoyed",
		"-2":"crazy",
		"-3":"disapproval",
		"-4":"disgust",
		"-5":"fear",
		"-6":"sad",
		"-7":"shame",
		"-8":"grief",
		"-9":"loathing",
		"-10":"anger",
		"-11":"rage"
	},
	visualization_sizes : {
		"mobile" : {
			"pie_word_types_container" : 300,
			"pie_word_types" : 125,
			"circle_strong_experiences" : 5
		},
		"tablet" : {
			"pie_word_types_container" : 225,
			"pie_word_types" : 75,
			"circle_strong_experiences" : 10
		},
		"web" : {
			"pie_word_types_container" : 325,
			"pie_word_types"	: 162,
			"circle_strong_experiences" : 10
		}
	}
});

var EmoomeSettings	= new EmoomeSettings();