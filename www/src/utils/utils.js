var LetiFramework = LetiFramework || {};

LetiFramework.Utils = LetiFramework.Utils || {};

LetiFramework.Utils.fbShare = function(picture, name, caption, description, link) {
	var params = {
		method: "feed"
	};
	if (picture) params.picture = picture;
	if (name) params.name = name;
	if (caption) params.caption = caption;
	if (description) params.description = description;

	if (LetiFramework.App.isPhoneGap()) {
		if (link) params.href = link;
		facebookConnectPlugin.showDialog(params,
			function(response) {
				LetiFramework.Utils.log(JSON.stringify(response))
			},
			function(response) {
				LetiFramework.Utils.log(JSON.stringify(response))
			});
	} else {
		if (link) params.link = link;
		FB.ui(params, function(response) {});
	}
}

LetiFramework.Utils.twShare = function(message, picture, link) {
	if (LetiFramework.App.isPhoneGap()) {
		window.plugins.socialsharing.shareViaTwitter(message, picture, link,
			function() {
				// Success handler
			},
			function(error) {
				alert("Cannot share via Twitter. Twitter app required!");
			});
	} else {
		window.open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(link), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
	}
}

LetiFramework.Utils.loadFont = function(custom_font) {
	var font = custom_font.font;
	var fontPath = this.getFontPath(font);
	var game = LetiFramework.Renderer.game;
	game.load.bitmapFont(font, fontPath + '.png', fontPath + '.fnt');
}

LetiFramework.Utils.loadAssetFont = function(custom_font) {
	var font = custom_font.font;
	var fontPath = this.getAssetFontPath(font);
	var game = LetiFramework.Renderer.game;
	game.load.bitmapFont(font, fontPath + '.png', fontPath + '.fnt');
}

LetiFramework.Utils.getFontPath = function(name) {
	return 'assets/font/' + name;
}

LetiFramework.Utils.getAssetFontPath = function(name) {
	var ctrlr = LetiFramework.GameController;
	return 'assets/stories/' + ctrlr.currentGame.storyId + '/episodes/' + ctrlr.currentGame.id + '/content/font/' + name;
}

LetiFramework.Utils.wrapText = function(text, width, font, fontSize) {
	if(!width) return text;
	
	var wrappedText = text;

	var lines = [];

	var game = LetiFramework.Renderer.game;

	for (var i = 0, start = 0; i < text.length; i++) {
		var tf = game.add.bitmapText(0, 0, font, text.substring(start, i), fontSize);

		if (tf.width > width) {
			var pos = tf.text.lastIndexOf(' ');

			if (pos == -1) {
				lines.push(tf.text);
				start += tf.text.length;
			} else {
				lines.push(tf.text.substring(0, pos).trim());
				start += pos;
			}
		}

		tf.destroy();
	}

	if (lines.length > 0) {
		wrappedText = lines.join('\n');
		if (wrappedText.length < text.length) {
			wrappedText += "\n" + text.substring(wrappedText.length).trim();
		}
	}

	return wrappedText;
}

LetiFramework.Utils.log = function(msg) {
	//console.log(msg);
	//alert(msg);
}