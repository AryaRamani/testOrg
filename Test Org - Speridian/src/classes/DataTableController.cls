public with sharing class DataTableController {
	
   
    @AuraEnabled
 	public static PaginateClass getRecords(String objname,list<String> fields,boolean next, boolean prev, decimal off,Integer page, String sortfield, String sorttype, String filtersearch, String searchtext, String searchfield, String filtervalue ) {
        integer offset= Integer.ValueOf(off);
        integer pagesize = Integer.ValueOf(page);
        
         String query;
 		//String objname='Account';
        string listcount = 'Select count() from '+ objname;
        Integer listlength=Database.countQuery(listcount);
        //system.debug(Database.query(countquery));
        system.debug('Length'+listlength);
        system.debug('Page size'+pagesize);
        system.debug('next'+next);
        system.debug('Previous'+prev);
        system.debug('Offset'+offset);
        if (next == false && prev == false) {
			offset = 0;

		} else if (next == true && (offset + pagesize) <= listlength) {
			offset = offset + pagesize;

		} else if (prev == true && offset > 0) {
			offset = offset - pagesize;

		}
		 String commaSepratedFields = '';
        for(String fieldName :fields ){
            if(commaSepratedFields == null || commaSepratedFields == ''){
                commaSepratedFields = fieldName;
            }else{
                commaSepratedFields = commaSepratedFields + ', ' + fieldName;
            }
        }
        String querylist;
        system.debug('Object Name'+objname);
        system.debug('Search field'+searchfield);
        system.debug('Search text' + searchtext);
        if(searchfield ==null || searchtext == ''){
            system.debug('In if');
                           querylist ='Select '+commaSepratedFields+' from '+ objname + ' order by '+sortfield +' '+ sorttype +' LIMIT '+ pagesize + 'OFFSET ' + offset ;

        }
        else if(filtervalue != ''){
            system.debug('In else');
             querylist ='Select '+commaSepratedFields+' from '+ objname + ' where '+searchfield + '=: '+ 'filtervalue '+ ' order by '+sortfield +' '+ sorttype +' LIMIT '+ pagesize + 'OFFSET ' + offset ;

        }
        else{
                       querylist ='Select '+commaSepratedFields+' from '+ objname + ' where '+searchfield + '=: '+ 'searchtext '+ ' order by '+sortfield +' '+ sorttype +' LIMIT '+ pagesize + 'OFFSET ' + offset ;
  
        }
            list<Sobject> datalist=Database.query(querylist);
        PaginateClass pg=new PaginateClass();
       pg.reclist = datalist;
		pg.offset = offset;
		pg.hasprev = hasprev(offset);
		pg.hasnext = hasnxt(offset, listlength, pagesize);
        pg.count=listlength;
        
        
        system.debug(datalist);
       
        
        return pg; 
        

    }
    
    private static boolean hasprev(integer off) {
		if (off > 0)
			return false;
		return true;
	}
	private static boolean hasnxt(integer off, integer li, integer ps) {
		if (off + ps < li)
			return false;
		return true;
	}
    
    public with sharing class PaginateClass {
	@AuraEnabled
     public list<Sobject> reclist;

		@AuraEnabled
		public integer offset;

		@AuraEnabled
		public integer total;

		@AuraEnabled
		public boolean hasprev;

		@AuraEnabled
		public boolean hasnext;
        
        @AuraEnabled
		public Integer count;

	}
    
    
    
}