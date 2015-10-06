'use strict';

angular.module('processStApp')
.directive('videoUploader', function ($sce) {
  return {
    templateUrl: 'scripts/directives/video-uploader.html',
    restrict: 'E',
    scope: {},
    link: function(scope) {
      scope.progress = '0%';
      // scope.apiToken = <API TOKEN HERE>

      var getPercent = function(loaded, total) {
        return parseInt(loaded / total * 100, 10) + '%';
      };

      var updateProgress = function(e, data) {
        scope.uploadStarted = true;
        scope.progress = getPercent(data.loaded, data.total);
        scope.$digest();
      };

      var uploadFinished = function(e, data) {
        scope.uploadFinished = true;
        scope.videoUrl = $sce.trustAsResourceUrl(data.result.thumbnail.url);
        scope.$digest();
      };

      var uploadFailed = function() {
        scope.uploadFailed = true;
        scope.uploadStarted = false;
        scope.$digest();
      };

      $('#fileupload').fileupload({ //jshint ignore:line
        url: 'https://upload.wistia.com/',
        type: 'POST',
        formData: [{
          name: 'api_password',
          value: scope.apiToken
        }],
        progressall: updateProgress
      })
      .on('fileuploaddone', uploadFinished)
      .on('fileuploadfail', uploadFailed);
    }
  };
});
