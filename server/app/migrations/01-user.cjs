module.exports = {
  async up(queryInterface) {
      // await queryInterface.sequelize.models.languages.bulkCreate(languages);
      // await queryInterface.sequelize.models.usersRoles.bulkCreate(userRoles);
      // const createdCountries = await queryInterface.sequelize.models.countries.bulkCreate(countries);
      // const regionList = [];
      // createdCountries.forEach(country => {
      //     if (regions[country.name]) {
      //         regions[country.name].forEach(region => {
      //             regionList.push({
      //                 name: region.name,
      //                 countryId: country.id
      //             });
      //         });
      //     }
      // });
      // await queryInterface.sequelize.models.regions.bulkCreate(regionList);
      // await queryInterface.sequelize.models.ratingTypes.bulkCreate(ratingTypes);
  },
  down: async () => { }
};