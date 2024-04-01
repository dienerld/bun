   import Geonames from 'geonames.js'; /* es module */

const geonames = Geonames({
  username: 'stella_squality',
  lan: 'pt',
  encoding: 'JSON'
});
try{
  const continents = await geonames.search({q: "CONT", maxRows: 8}) //get continents
     console.log(continents.geonames.length);
     console.log(continents.geonames[5]);
     
  const test = await geonames.children({geonameId: continents.geonames[5].geonameId})
  console.log(test);

}catch(err){
  console.error(err);
}
