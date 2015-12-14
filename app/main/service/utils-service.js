/**
 * Created by petulantslacker on 14/12/15.
 */
app.factory('utils', function(){
   return {
       deleteItemFromArray: function(array, index){
           array.splice(index,1);
       }
   }
});