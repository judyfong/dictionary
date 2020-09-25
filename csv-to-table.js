d3.csv("language_technology.csv", function(error, data) {
		  if (error) throw error;
    //comes from: http://bl.ocks.org/AMDS/4a61497182b8fcb05906
		  var sortAscending = true;
		  var table = d3.select('#EN-IS-dictionary');
		  var titles = d3.keys(data[0]);
		  var headers = table.append('thead').append('tr')
		                   .selectAll('th')
		                   .data(titles).enter()
		                   .append('th').attr('scope', 'col')
		                   .text(function (d) {
			                    return d;
		                    })
		                   .on('click', function (d) {
		                	   headers.attr('class', 'header');
		                	   
		                	   if (sortAscending) {
		                	     rows.sort(function(a, b) { return b[d] < a[d]; });
		                	     sortAscending = false;
		                	     this.className = 'aes';
		                	   } else {
		                		 rows.sort(function(a, b) { return b[d] > a[d]; });
		                		 sortAscending = true;
		                		 this.className = 'des';
		                	   }
		                	   
		                   });
		  
		  var rows = table.append('tbody').selectAll('tr')
		               .data(data).enter()
		               .append('tr');
		  rows.selectAll('td')
		    .data(function (d) {
		    	return titles.map(function (k) {
		    		return { 'value': d[k], 'name': k};
		    	});
		    }).enter()
		    .append('td')
		    .attr('data-th', function (d) {
		    	return d.name;
		    })
		    .text(function (d) {
		    	return d.value;
		    });
	  });
