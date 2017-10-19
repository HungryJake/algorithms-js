var endorsements = [
  { skill: 'javascript', user: 'Chad' },
  { skill: 'javascript', user: 'Bill' },
  { skill: 'css', user: 'Sue' },
  { skill: 'javascript', user: 'Sue' },
  { skill: 'css', user: 'Bill' },
  { skill: 'html', user: 'Sue' }
];

var correctOutput = [
  { skill: 'javascript', user: [ 'Chad', 'Bill', 'Sue' ], count: 3 },
  { skill: 'css', user: [ 'Sue', 'Bill' ], count: 2 },
  { skill: 'html', user: [ 'Sue' ], count: 1 }
];

function formatData(input) {
  var skillHash = {},
      data = [],
      i,
      skill;
      
  for (i=0; i<input.length; i++) {
    if (!skillHash[input[i]['skill']]) {
      var skillName = input[i]['skill'];
      skillHash[skillName] = {
        skill: input[i]['skill'],
        user: [],
        count: 0
      };
    }
    skillHash[skillName]['user'].push(input[i]['user']);
    skillHash[skillName]['count']++;
  }
  
  for (skill in skillHash) {
    var skillObj = skillHash[skill];
    data.push(skillObj);
  }
  
  return data.sort(function (obj1, obj2) {
    return obj2['count'] - obj1['count'];
  });
  
}
