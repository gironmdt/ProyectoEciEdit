/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app = angular.module("app",[]);
var stompClient = null;
var conectado= false;
app.controller("JsDocumentos", function($scope,$log,$http) {
    $scope.Documeto={texto:"texto"};
    $scope.ext= "EciEditor"
    $log.debug('se creo el $scope');
    $scope.loadData = function() {
        $log.debug("LoadData" + $scope.Documeto);
        var configList = {
            method: "GET",
            url: "getDocumento"
        };          
        var response=$http(configList);

        response.success(function(data, status, headers, config) {
            $scope.Documeto = data;
            document.getElementById('texto').value = $scope.Documeto.texto;
        });

        response.error(function(data, status, headers, config) {
            alert("Ha fallado la petición. Estado HTTP:"+status);
        });
        if(conectado==false){
            connect();
            conectado=true;
        }
    };
    $scope.loadData();
    
    $scope.setDocumento = function() {
        $scope.Documeto.texto =document.getElementById('texto').value;
        $http({
            method  : 'POST',
            url     : 'setDocumento',
            data    : $scope.Documeto
        });
    };
    
    function connect() {
        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        
        stompClient.connect({}, function(frame) {
            console.log('Connected: ' + frame); 
            stompClient.subscribe('/topic/messages', function(Documeto){
                document.getElementById('texto').value = JSON.parse(Documeto.body).texto;
            });
        });
    }

    function showServerMessage(message) {
        $scope.$apply(function () {
            $scope.Documeto =message;
        });
    }
    
    
$scope.updateSize = function()   {
    var fullPath = document.getElementById('uploadInput').value;
    if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                    filename = filename.substring(1);
            }
            $scope.ext = filename;
    }
    var file = document.getElementById('uploadInput').files[0];
    var texto = document.getElementById('texto');
    if (file) {
        // create reader
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e) {
            // browser completed reading file - display it
            texto.value=(e.target.result);
            $scope.Documeto.texto= e.target.result;
            $scope.setDocumento();
        };
    }
}

    $scope.download = function()   {
        var file = document.getElementById('uploadInput').files[0];
        var texto = document.getElementById('texto');
        if (file) {
            // create reader
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(e) {
                // browser completed reading file - display it
                texto.value=(e.target.result);
                $scope.Documeto.texto= e.target.result;
                $scope.setDocumento();
            };
        }
    }
    $scope.makeTextFile = function (text) {
        
        var data = new Blob([text], {type: 'text/plain'});
        var textFile=null;
        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
          window.URL.revokeObjectURL(textFile);
        }

        textFile = window.URL.createObjectURL(data);

        return textFile;
    };
    
     $scope.generarArchivo = function () {
        
      var textbox = document.getElementById('texto');
      var url="";
      var link = document.getElementById('downloadlink');
      
       url=$scope.makeTextFile(textbox.value);
      link.href = url;
      link.style.display = 'block';
      link.download = $scope.ext;
      link.click();
    }
    

  
});

