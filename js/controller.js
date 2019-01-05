app.controller('myController',function($scope){
					$scope.colData = ["","",""];
                    $scope.rowData = ["",""];
                    $scope.rowIndex = null;
                    $scope.values = new Array() ;
                    $scope.tableName = null;

                    $scope.validateExcelData = function(){
                        if($scope.tableName == null || $scope.tableName == ""){
                            alert("请输入表名");
                            return;
                        }
                        if($scope.values.length < 2){
                            alert("请至少输入一行表头和一行数据");
                            return;
                        }
                    };
                    $scope.saveExcel = function(e) {
                        $scope.validateExcelData();
                        var headArray= new Array();
                        var dataArray = new Array();

                        for(var i=0;i<$scope.rowData.length;i++){
                            if(i==0){
                                for(var j=0;j<$scope.colData.length;j++){
                                    if($scope.values[i][j] != null){
                                        headArray.push($scope.values[i][j]);
                                    }
                                }
                            }else{
                                dataArray[i-1] = new Array();
                                for(var j=0;j<$scope.colData.length;j++){
                                    //console.log($scope.values[i][j]);
                                    dataArray[i-1][j] = $scope.values[i][j];
                                }
                            }
                        }
                        $http.post("text/createExcel.do",{
                            excelData: JSON.stringify({
                                header: headArray,
                                data: dataArray,
                                tableName: $scope.tableName,
                                batchId:Date.parse(new Date())
                            })
                        }).success(function(result){
                            if(result.code == 100){
                                $rootScope.isExcel = true;
                                $rootScope.tableName=result.content[0].name;
                                $rootScope.datasetTitle=result.content[0].datasetTitle;
                                $rootScope.datasourceId=result.content[0].datasourceId ;
                                $rootScope.datasetId= result.content[0].id;
                                $uibModalInstance.close();
                                $scope.newWgt({datasetId: $rootScope.datasetId});
                                $scope.loadData();
                            }else{
                                alert(result.message);
                            }
                        });
                    }


                    $scope.selectRow = function(e) {
                        for(var i=0;i<$scope.rowData.length;i++){
                            for(var j=0;j<$scope.colData.length;j++){
                                console.log($scope.values[i][j]);
                            }
                        }
                        //var tmp = "";
                        //$scope.rowData.push(tmp);
                    }

                    //  column
                    $scope.addColumn = function (e) {
                        var tmp = "";
                        $scope.colData.push(tmp);
                    }
                    $scope.delColumn = function (e) {
                        var len = $scope.colData.length;
                        if(len ==1 ) {
                            alert("不少于1列");
                            return;
                        }
                        $scope.colData.splice(len-1,1);
                    }
                    //  row
                    $scope.addRow = function (e) {
                        var tmp = "";
                        $scope.rowData.push(tmp);
                    }
                    $scope.delRow = function (e) {
                        var len = $scope.rowData.length;
                        if(len ==2 ) {
                            alert("不少于2行");
                            return;
                        }
                        $scope.rowData.splice(len-1,1);
                    }

	
	
	
})