@import './utilities.js';

function exportAllPages(context) {
	var sketch = context.api();
	var application = sketch.Application();
	var doc = context.document;
	var pages = doc.pages();

	var filename = context.document.fileURL().lastPathComponent().split('.')[0].replace(/ \([\s\S]*?\)/g, '').replace(/ /g,"_").toLowerCase();
	var file_path = Utilities.selectFolder();
	var rootFolder = file_path + filename + "/";

	Utilities.deleteAndCreateFolder(rootFolder);

	if (file_path) {
		for (var i = 0; i < pages.count(); i++) {
			var currentPage = pages[i];

			if (pages[i].name() != "Symbols") {
				var pageFolderPath = rootFolder + pages[i].name().replace(/ /g,"_").toLowerCase() + "/";
				Utilities.createFolder(pageFolderPath);

				doc.setCurrentPage(currentPage);

				var artboards = doc.currentPage().artboards();

				for (var j = 0; j < artboards.count(); j++) {
					var artboard = artboards[j];
					var request = MSExportRequest.exportRequestsFromExportableLayer_inRect_useIDForName(artboard, artboard.absoluteRect().rect(), false)[0]
					request.scale = 2

					var artboardNameWithDashesInsteadOfSlashes = Utilities.cleanArtboardName(String(artboard.name()).toLowerCase());

					// TODO Try and get the exportable options for each artboard,
					// and export it that way. If there are no export options,
					// export the file as a @1x .png file.
					doc.saveArtboardOrSlice_toFile(request, pageFolderPath + artboardNameWithDashesInsteadOfSlashes.replace(/ /g,"_") + ".png");
				}
			}
		}
		application.alert("Done!", "Your files are ready")
	}
};