({
	displaydata : function(component, data) {
	 //alert(JSON.stringify(data));
 d3.select("#chart").select("svg").remove();
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,//960
    height = 200 - margin.top - margin.bottom;//500

var x0 = d3.scaleBand().rangeRound([0, width]);

var x1 =d3.scaleBand();

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var xAxis = d3.axisBottom(x0).tickSize(0);

var yAxis = d3.axisLeft(y);

var color = d3.scaleOrdinal()
    .range(["#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0","#006400","#BC8F8F"]);

/* var svg = d3.select('#chart').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); */
var svg = d3.select('#chart').append("svg")
    .attr("width", width + margin.left + margin.right )
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 //alert('Error'+data);
 
  var categoriesNames = data.map(function(d) { return d.type; });
  var rateNames = data[0].values.map(function(d) { return d.agerange; });
  console.log(categoriesNames);
 // alert('Range'+rateNames);
  x0.domain(categoriesNames);
  x1.domain(rateNames).range([0, x0.bandwidth()]);
 
  y.domain([0, d3.max(data, function(categorie) {  return d3.max(categorie.values, function(d) { return d.count; }); })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .style('opacity','0')
      .call(yAxis)
  .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style('font-weight','bold')
      .text("Value");

  svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');
 
  var slice = svg.selectAll(".slice")
      .data(data)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform",function(d,i) {
      console.log(i); 
      console.log(x0(d.type));
      var s= x0(d.type)+10*i;
       return "translate(" + s + ",0)"; });

  slice.selectAll("rect")
      .data(function(d) { return d.values; })
  .enter().append("rect")
      .attr("width", x1.bandwidth())
      .attr("x", function(d) {   return x1(d.agerange); })
      .style("fill", function(d) { return color(d.agerange) })
      .attr("y", function(d) { return y(0); })
      .attr("height", function(d) { return height - y(0); })
      .on("mouseover", function(d) {
          d3.select(this).style("fill", d3.rgb(color(d.agerange)).darker(2));
      })
      .on("mouseout", function(d) {
          d3.select(this).style("fill", color(d.agerange));
      });

  slice.selectAll("rect")
      .transition()
      .delay(function (d) {return Math.random()*1000;})
      .duration(1000)
      .attr("y", function(d) { return y(d.count); })
      .attr("height", function(d) { return height - y(d.count); });

  //Legend
  var legend = svg.selectAll(".legend")
      .data(data[0].values.map(function(d) {return d.agerange; }).reverse())
  .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d,i) {
      var h= (i * 20)-20;
       return "translate(20," + h + ")"; })
      .style("opacity","0");

  legend.append("rect")
      .attr("x", width - 10)//18
      .attr("width", 10)//18
      .attr("height", 10)//18
      .style("fill", function(d) { return color(d); });

  legend.append("text")
      .attr("x", width - 10)//18
      .attr("y", 5)// 9
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {return d; });

  legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

  component.set("v.showSpinner", false);

	
	},
	
	
	generatechartdata: function(component, event, helper){
	//repeated same code twice since browser stops responding if code is in  helper on file upload
	var infolst=component.get("v.data");
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
             var   count1= _.filter(employeelist,function(o){
                                return(o.ageRange=='0-29'&&o.type==typelist[m])});
              var count2= _.filter(employeelist,function(o){
                                return(o.ageRange=='30-39'&&o.type==typelist[m])});
             var count3= _.filter(employeelist,function(o){
                                return(o.ageRange=='40-44'&&o.type==typelist[m])});
               
               var objdata={
                  'type': typelist[m],
                   'values':objlist
               };
               
               objdatalist.push(objdata);
               
              
            }
            console.log('Data'+JSON.stringify(objdatalist));
            

      
            this.displaydata(component,objdatalist);
	}
})