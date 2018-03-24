module.exports = {
 
    tableName : "user",
   
    attributes : {
      name : {
        type : "string"
      },
      last_name : {
        type : "string"
      },
      born_date : {
        type : "date"
      }
    },
   
   
    associations : [{
      type    : "belongsTo",
      target  : "Profile",
      options : {
        foreignKey : "profile_id"
      }
    }],
   
    validate : {},
    indexes  : []
  };