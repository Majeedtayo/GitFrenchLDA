var LetiFramework = LetiFramework || {};

LetiFramework.NetworkManager = LetiFramework.NetworkManager || {};

LetiFramework.NetworkManager.serverURL = "http://luminous.letigames.com/";

LetiFramework.NetworkManager.appId = 2;
LetiFramework.NetworkManager.appName = "Hello Nurse";
LetiFramework.NetworkManager.appDescription = "Nurses Course";
LetiFramework.NetworkManager.fbAppLink = "https://fb.me/975844915818426";

LetiFramework.NetworkManager.MODEL_TYPE_NONE = 0;
LetiFramework.NetworkManager.MODEL_TYPE_LOG = 1;
LetiFramework.NetworkManager.MODEL_TYPE_ADMIN = 2;
LetiFramework.NetworkManager.MODEL_TYPE_USER = 3;
LetiFramework.NetworkManager.MODEL_TYPE_STORY = 4;
LetiFramework.NetworkManager.MODEL_TYPE_EPISODE = 5;
LetiFramework.NetworkManager.MODEL_TYPE_APP_BUILD = 6;
LetiFramework.NetworkManager.MODEL_TYPE_APP_BUILD_STORY = 7;
LetiFramework.NetworkManager.MODEL_TYPE_APP_BUILD_LOCK_CODE = 8;
LetiFramework.NetworkManager.MODEL_TYPE_PUSH_REGISTRATION = 9;
LetiFramework.NetworkManager.MODEL_TYPE_APP_BUILD_REG_VALIDATION = 10;
LetiFramework.NetworkManager.MODEL_TYPE_PUSH_CONTENT = 11;
LetiFramework.NetworkManager.MODEL_TYPE_BADGE = 12;

LetiFramework.NetworkManager.initialize = function() {
	// Nothing
}

LetiFramework.NetworkManager.getBuildImageURL = function() {
	return this.serverURL + "ReadContent?k=letiframework/build/" + this.appId + "/image/image.png";
}

LetiFramework.NetworkManager.getBadgeImageURL = function(storyId, episodeId, badgeName) {
	return this.serverURL + "ReadContent?k=letiframework/stories/" + storyId +
		"/episodes/" + episodeId + "/badge/" + badgeName;
}

LetiFramework.NetworkManager.getStoriesURL = function() {
	return this.serverURL + "GenerateStoriesJson?id=" + this.appId;
}

LetiFramework.NetworkManager.getStoryCoverURL = function(id) {
	return this.serverURL + "DownloadServlet?contentType=1&id=" + id;
}

LetiFramework.NetworkManager.getEpisodeCoverURL = function(id) {
	return this.serverURL + "DownloadServlet?contentType=2&id=" + id;
}

LetiFramework.NetworkManager.getEpisodeContentURL = function(id) {
	return this.serverURL + "DownloadServlet?contentType=3&id=" + id;
}

/*
 * Download file from url and save to device filePath
 */
LetiFramework.NetworkManager.downloadFile = function(url, filePath, success, error) {
	var ft = new FileTransfer();
	ft.download(encodeURI(url), filePath, success, error);
	return ft;
}

LetiFramework.NetworkManager.downloadFile = function(url, filePath, success, error, progress) {
	var ft = new FileTransfer();
	ft.onprogress = progress;
	ft.download(encodeURI(url), filePath, success, error);
	return ft;
}

LetiFramework.NetworkManager.postRequest = function(page, data, success, error) {
	$.post(this.serverURL + page, {
		nReq: JSON.stringify(data)
	}).done(success).fail(error);
}

LetiFramework.NetworkManager.getRequest = function(page, data, success, error) {
	$.get(this.serverURL + page + (data ? "?nReq=" + JSON.stringify(data) : "")).done(success).fail(error);
}