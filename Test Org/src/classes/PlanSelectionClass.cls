public class PlanSelectionClass {

	private static integer pagesize = 5; /* static page size*/
	private static integer offset;

	@AuraEnabled
	public static list < String > fetchplandata() {
	/* to fetch filter name information*/
	set<String> attlst=new set<string>();
		list < BA_Product_Attribute__c > att = [Select id, ba_AttributeINNDisplayValue__c, ba_AttributeName__c, Name
			from BA_Product_Attribute__c where ba_KeyAttribute__c = true
		];

		list < String > attributelist = new list < String > ();
		for (BA_Product_Attribute__c product: att) {
			attlst.add(product.Name);
		}
		attributelist.addall(attlst);
		return attributelist;
	}

	@AuraEnabled
	public static ProductAttributes fetchproductline(boolean next, boolean prev, decimal off) {
	/*To fetch product line information*/
		list < String > line = new list < String > ();
		integer offset = Integer.ValueOf(off);
		ProductAttributes att = new ProductAttributes();
		Integer listlength = [Select count() from BA_Product_Flat__c];
		/* To implement pagination*/
		if (next == false && prev == false) {
			offset = 0;

		} else if (next == true && (offset + pagesize) <= listlength) {
			offset = offset + pagesize;

		} else if (prev == true && offset > 0) {
			offset = offset - pagesize;

		}
		list < BA_Product_Flat__c > product = [Select id, name, ba_ProductLine__c from BA_Product_Flat__c
			LIMIT: pagesize OFFSET: offset
		];
		for (BA_Product_Flat__c flat: product) {
			line.add(flat.ba_ProductLine__c);
		}
		att.productline = line;
		att.offst = offset;
		att.hasprev = hasprev(offset);
		att.hasnext = hasnxt(offset, listlength, pagesize);

		return att;
	}

	@AuraEnabled
	public static ProductAttributes fetchplaninfo(String filter, boolean next, boolean prev, decimal off) {
		system.debug('Next' + next);
		system.debug('Previous' + prev);
		integer offset = Integer.ValueOf(off);
		/* to implement pagination*/
		integer listlength = [Select count() from BA_Product_Attribute__c
			where ba_KeyAttribute__c = true
			AND Name =: filter
		];
		if (next == false && prev == false) {
			offset = 0;

		} else if (next == true && (offset + pagesize) <= listlength) {
			offset = offset + pagesize;

		} else if (prev == true && offset > 0) {
			offset = offset - pagesize;

		}
		system.debug('Offset' + offset);
		system.debug('LIMIT' + pagesize);
		
		/* Fetches information based on the filter selected*/
		list < BA_Product_Attribute__c > att = [Select id, ba_AttributeINNDisplayValue__c, ba_AttributeName__c, Name from BA_Product_Attribute__c
			where ba_KeyAttribute__c = true
			AND Name =: filter
			LIMIT: pagesize OFFSET: offset
		];
		list < ProductFilters > filterlist = new list < ProductFilters > ();
		//  ProductAttributes productatt=new ProductAttributes();
		ProductAttributes attlist = new ProductAttributes();
		//list<String> attlist=new list<String>();
		for (BA_Product_Attribute__c prod: att) {
			ProductFilters product = new ProductFilters();
			//product.PackageId=prod.ba_Package__c;
			product.filterId = prod.Id;
			product.displaynames = prod.ba_AttributeINNDisplayValue__c;
			product.selected = true;
			filterlist.add(product);
		}

		attlist.productfilter = filterlist;
		attlist.filtername = filter;
		attlist.offst = offset;
		attlist.hasprev = hasprev(offset);
		attlist.hasnext = hasnxt(offset, listlength, pagesize);
		system.debug('Attribute list' + attlist);

		return attlist;
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

	@AuraEnabled
	public static ProductAttributes fetchpackageinfo(String filter, list < String > typefilter, list < String > linefilter, boolean next, boolean prev, decimal off) {
		integer offset = Integer.ValueOf(off);
		list < ProductFilters > prodList = (List < ProductFilters > ) System.JSON.deserialize(filter, List < ProductFilters > .class);
		/* To get package information based on the filter*/
		System.debug('Product Type' + typefilter);
		system.debug('Product line' + linefilter);
		Integer listlength;
		list < BA_Product_Flat__c > flat = new list < BA_Product_Flat__c > ();
		if (prodList.size() > 0) {
			system.debug('Filters not selected' + filter);
			list < String > attributeId = new list < String > ();
			list < string > productlist = new list < String > ();

			for (integer j = 0; j < prodList.size(); j = j + 1) {
				system.debug('Id' + j + prodList[j].filterId);
				productlist.add(prodList[j].filterId);
			}
			list < BA_Product_Attribute__c > product = [Select id, Name, ba_Package__c from BA_Product_Attribute__c
				where id NOT IN: productlist
				AND ba_KeyAttribute__c = true

			];

			system.debug('Attribute NOT IN' + product);

			for (BA_Product_Attribute__c attribute: product) {
				attributeId.add(attribute.Id);
			}
			list < ba_PackageAttribute_Intersection__c > packageinter = [Select id, Predefined_Packages__c, Package_Attributes__c
				from ba_PackageAttribute_Intersection__c
				where Package_Attributes__c IN: attributeId
			];
			/* Queries those packages that do not contain the filter list
			Filter list contains values not selected*/
			system.debug('Package Attribute' + attributeId);
			system.debug('Junction value' + packageinter);
			list < string > attid = new list < string > ();
			for (ba_PackageAttribute_Intersection__c inter: packageinter) {
				attid.add(inter.Predefined_Packages__c);
			}
			listlength = [Select count()
				from BA_Product_Flat__c where id IN: attid
				OR ba_ProductLine__c NOT IN: linefilter
				OR ba_ProductType__c NOT IN: typefilter
			];
			if (next == false && prev == false) {
				offset = 0;

			} else if (next == true && (offset + pagesize) <= listlength) {
				offset = offset + pagesize;

			} else if (prev == true && offset > 0) {
				offset = offset - pagesize;

			}

			flat = [Select id, ba_PackageName__c, ba_BusinessPackageId__c, ba_BasePackageId__c, ba_PackageCode__c
				from BA_Product_Flat__c where
				id IN: attid OR
				ba_ProductLine__c NOT IN: linefilter
				OR ba_ProductType__c NOT IN: typefilter
				LIMIT: pagesize OFFSET: offset
			];
			system.debug('PAckage Info' + flat);
		} else {
			listlength = [Select count()
				from BA_Product_Flat__c where
				ba_ProductLine__c NOT IN: linefilter
				OR ba_ProductType__c NOT IN: typefilter
			];
			if (next == false && prev == false) {
				offset = 0;

			} else if (next == true && (offset + pagesize) <= listlength) {
				offset = offset + pagesize;

			} else if (prev == true && offset > 0) {
				offset = offset - pagesize;

			}

			flat = [Select id, ba_PackageName__c, ba_BusinessPackageId__c, ba_BasePackageId__c, ba_PackageCode__c
				from BA_Product_Flat__c
				where ba_ProductLine__c NOT IN: linefilter
				OR ba_ProductType__c NOT IN: typefilter
				LIMIT: pagesize OFFSET: offset
			];
		}
		ProductAttributes attlist = new ProductAttributes();
		attlist.packagefilters = flat;
		attlist.offst = offset;
		attlist.hasprev = hasprev(offset);
		attlist.hasnext = hasnxt(offset, listlength, pagesize);
		return attlist;

	}


/* Wrapper object created for Filters*/
	public with sharing class ProductAttributes {
		@AuraEnabled
		public String filtername;

		@AuraEnabled
		public list < String > productline;

		@AuraEnabled
		public list < BA_Product_Flat__c > packagefilters;

		@AuraEnabled
		public list < ProductFilters > productfilter;

		@AuraEnabled
		public integer offst;

		@AuraEnabled
		public integer total;

		@AuraEnabled
		public boolean hasprev;

		@AuraEnabled
		public boolean hasnext;

	}
	
/*Wrapper object will contain information based on filter name*/
	public with sharing class ProductFilters {

		@AuraEnabled
		public boolean selected;

		@AuraEnabled
		public String PackageId;

		@AuraEnabled
		public String filterId;

		@AuraEnabled
		public String displaynames;

		public ProductFilters() {
			this.Selected = false;
		}

	}

}