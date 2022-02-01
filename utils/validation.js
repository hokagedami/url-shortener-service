const dns = require('dns');
const url = require('url');

const lookupUrl = "https://stackoverflow.com";
const parsedLookupUrl = url.parse(lookupUrl);

dns.lookup(parsedLookupUrl.protocol ? parsedLookupUrl.host
        : parsedLookupUrl.path, (error,address,family)=>{

        console.log(error || !address ? lookupUrl + ' is an invalid url!'
            : lookupUrl + ' is a valid url: ' + ' at ' + address);

    }
);