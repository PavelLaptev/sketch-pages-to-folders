var Utilities = {};

Utilities.selectFolder = function (){
	//open a window to select a folder to save to
	var panel = [NSOpenPanel openPanel];
	[panel setCanChooseDirectories:true];
	[panel setCanCreateDirectories:true];
  
	//checks if user clicks open in window
	var clicked = [panel runModal];
	if (clicked == NSFileHandlingPanelOKButton) {
  
	  var isDirectory = true;
	  var firstURL = [[panel URLs] objectAtIndex:0];
	  var unformattedURL = [NSString stringWithFormat:@"%@", firstURL];
  
	  //makes sure spaces aren't formatted to %20
	  var file_path = [unformattedURL stringByRemovingPercentEncoding];
  
	  //removes file:// from path
	  if (0 === file_path.indexOf("file://")) {
		 file_path = file_path.substring(7);
		 return file_path;
	  }
	}
  }

Utilities.createFolder = function(path) {
    var fileManager = NSFileManager.defaultManager();
    fileManager.createDirectoryAtPath_withIntermediateDirectories_attributes_error_(
        path,
        true,
        nil,
        nil
    );
};

Utilities.deleteFolder = function(path) {
    var fileManager = NSFileManager.defaultManager();

    fileManager.removeItemAtPath_error(path, nil);
};

Utilities.deleteAndCreateFolder = function(path) {
    Utilities.deleteFolder(path);
    Utilities.createFolder(path);
};

Utilities.cleanArtboardName = function(name) {
    var cleanedUpName = "";

    for (var i = 0; i < name.length; i++) {
        if (name[i] != "/") cleanedUpName += name[i];
        else cleanedUpName += "-";
    }

    return cleanedUpName;
};
