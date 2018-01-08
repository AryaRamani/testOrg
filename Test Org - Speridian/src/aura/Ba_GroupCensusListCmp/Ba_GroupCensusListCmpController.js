({
    readCSV: function(component, event, helper) {
    component.set("v.showSpinner", true);
      d3.select("#chart").select("svg").remove();
        var filename = event.getSource().get("v.files");
        console.log('CSV File name' + JSON.stringify(filename));
        var textdata;
        var reader = new FileReader();
        var infolst = [];
        reader.onload = function() {
            var text = reader.result; /*Get the data stored in file*/
            console.log(reader.result.substring(0, 200));
            console.log('Data from CSV file' + text);
            textdata = text;
            var rows = textdata.split('\n'); /*Spilt based on new line to get each row*/
            console.log('File header' + rows[0]);
            component.set("v.showSpinner", false);
            
             if(rows.length>10000){
           //  alert(rows.length);
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                        	"title": "Warning!",
                        	"message": "More than 10,000 records",
                        	"type" : "warning",
                        	"mode" : "sticky"
                        });
                        toastEvent.fire();
                }

            /* Ignore the first row and start from second*/
            for (var i = 1; i < rows.length; i = i + 1) {
                console.log('Length', +rows.length); //total number of rows in the file including header
                /*Spilt based on the comma*/
                var cells = rows[i].split(',');
                console.log('One row' + cells);
                console.log('Row length' + cells.length);
               
                if(cells.length!=1){
                var cellinfo = {
                    'EmployeeId': cells[0],
                    'LastName': cells[1],
                    'FirstName': cells[2],
                    'Date': cells[3],
                    'Gender': cells[4],
                    'Tobacco': cells[5],
                    'Relation': cells[6],


                };

                console.log('Record Object', cellinfo);
                infolst.push(cellinfo);
                component.set("v.data",infolst);
                }

            }
            
            //helper.generatechartdata(component);
            var aMap = {};

            function addValueToKey(key, value) {
                aMap[key] = aMap[key] || [];
                var tempArr = aMap[key];
                tempArr.push(value);
                aMap[key] = tempArr;
                aMap[key] = _.sortBy(aMap[key], function(x) {
                    return x.EmployeeId;
                });
            }
            for (var i = 0; i < infolst.length; i = i + 1) {
                addValueToKey(infolst[i].EmployeeId, infolst[i]);
            }
            console.log('Map' + JSON.stringify(aMap));
            var employeelist = [];
            var key = Object.keys(aMap);
            console.log('Keys' + key);
            var today_date = new Date();
            var today_year = today_date.getFullYear();
            //console.log(today_date);
            for (var i = 0; i < key.length; i = i + 1) {
                var itemlist = aMap[key[i]];
                var age;
                var agerange;
                var gender;
                var relationlist = [];
                _.forEach(itemlist, function(o) {
                    relationlist.push(o.Relation);

                });
                console.log('Relation list' + relationlist);

                for (var j = 0; j < itemlist.length; j = j + 1) {
                    var type;
                    console.log('Fields' + itemlist[j].Date);
                    if(itemlist[j].Date!==undefined){
                    var dob = itemlist[j].Date.split('/');
                    }
                    // var newdate=new Date(dob[2], dob[1] * 1 , dob[0]);
                    console.log('Relation' + itemlist[j].Relation);

                    if (itemlist[j].Relation == 'Subscriber\r') {
                        age = today_year - dob[2];
                        console.log('Age' + age);
                        gender = itemlist[j].Gender;
                        if (age >= 0 && age <= 29) {
                            agerange = '0-29';
                        } else if (age >= 30 && age <= 39) {
                            agerange = '30-39';
                        } else if (age >= 40 && age <= 44) {
                            agerange = '40-44';
                        }
                        else if (age >= 45 && age <= 49) {
                            agerange = '45-49';
                        }
                         else if (age >= 50 && age <= 54) {
                            agerange = '50-54';
                        }
                        else if (age >= 55 && age <= 59) {
                            agerange = '55-59';
                        }
                         else if (age >= 60 && age <= 64) {
                            agerange = '60-64';
                        }

                    }


                }
                if (relationlist.length == 1) {
                    if (gender == 'Male') {
                        type = 'Single Male';
                    } else {
                        type = 'Single Female';
                    }

                } else if (_.includes(relationlist, 'Spouse\r', 'Dependent\r')||_.includes(relationlist, 'Spouse\r')) {
                    type = 'Family';
                } else if (_.includes(relationlist, 'Dependent\r')) {
                    if (gender == 'Male') {
                        type = 'P&C Male';
                    } else {
                        type = 'P&C Female';
                    }
                }

                var employee = {
                    'employeeId': key[i],
                    'ageRange': agerange,
                    'type': type,


                };



                console.log('Employee Object' + JSON.stringify(employee));

                employeelist.push(employee);

            }
            
            var rangelist=['0-29','30-39','40-44','45-49','50-54','55-59','60-64'];
            var typelist=['Single Male','Single Female','Family','P&C Male','P&C Female'];
            var count=[];
               var data=[];
          data.push('Type');
          data.push(rangelist);
          var objdatalist=[];
            for(var m=0;m<typelist.length;m=m+1){
            data.push(typelist[m]);
            var objlist=[];
               for(var n=0;n<rangelist.length;n=n+1){
               
                 // count[m]=[];
              count[n]= _.filter(employeelist,function(o){
                                return(o.ageRange==rangelist[n]&&o.type==typelist[m]);
                                   
                                
                           }).length;
                // alert('Age'+rangelist[n]+ count[n]);
                 // data.push(',');
               data.push(count[n]);
               var Values={
               'agerange':rangelist[n],
               'count':count[n],
               };
               
               objlist.push(Values);
                    
               }
             
               
               var objdata={
                  'type': typelist[m],
                   'values':objlist
               };
               
               objdatalist.push(objdata);
               
              
            }
            console.log('Data'+JSON.stringify(objdatalist));
            

      
            helper.displaydata(component,objdatalist);
        
          
          


        };
        if (filename[0] !== undefined && filename[0] !== null && filename[0] !== '') {
            reader.readAsText(filename[0]);
        }

        


    },
    
    onInit : function(component,event,helper){
     // alert('Script loaded');
     var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 660 - margin.left - margin.right,//960
    height = 200 - margin.top - margin.bottom;//500
    
    var x0 = d3.scaleBand().rangeRound([0, width]);
    var xAxis = d3.axisBottom(x0).tickSize(0);
    var y = d3.scaleLinear()
    .rangeRound([height, 0]);
    var yAxis = d3.axisLeft(y);
    
     var typelist=['Single Male','Single Female','Family','P&C Male','P&C Female'];
     x0.domain(typelist);
     y.domain([0, 10]);
    var svg = d3.select('#chart').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
      
       svg.append("g")
      .attr("class", "y axis")
      .style('opacity','1')
      .call(yAxis)
  .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style('font-weight','bold');
    
    if(!$A.util.isEmpty(component.get("v.data"))){
        
       helper.generatechartdata(component);
    }
      
      
    },
    
    
    
    /* To apply validation
 		  
        validateFields: aura:method invoked from chapter component Ba_EligibilityFrmChapterCmp
		Checks validation for Group Census
		If validation fails returns false to the chapter component*/
        
        
        
         validateFields: function(component, event) {

            var error = [];
            var params = event.getParam('arguments');
            var message;
            
            if (params) {
            if(component.get("v.data").length>0){
                 params.validate=true;
            }
            else{
            	params.validate=false;
            	 var toastEvent = $A.get("e.force:showToast");
    toastEvent.setParams({
        "title": "Warning!",
        "message": "Please input Group Census Information",
        "type" :  "error"
    });
    toastEvent.fire();
            }

               // component.set("v.Errormessage", error);
               // alert('In child'+ params.validate);
                return params;  //return validation status to chapter component
            }
        },
    
    
    


})