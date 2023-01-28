const chai = require('chai');
const expect = chai.expect;

const Vampire = require('../vampire.js');

describe("Vampire", function() {

  let rootVampire;
  beforeEach(function() {
    rootVampire = new Vampire("root");
  });

  describe("allMillennialVampires", function() {
    let offspring1, offspring2, offspring3, offspring4, offspring5, offspring6, offspring7, offspring8;
    beforeEach(() => {
      offspring1 = new Vampire("a", 1000);
      offspring2 = new Vampire("b", 900);
      offspring3 = new Vampire("c", 1400);
      offspring4 = new Vampire("d", 1890);
      offspring5 = new Vampire("e", 1990);
      offspring6 = new Vampire("f", 2000);
      offspring7 = new Vampire("g", 2010);
      offspring8 = new Vampire("h", 2017);

      rootVampire.addOffspring(offspring1);
      rootVampire.addOffspring(offspring2);
      rootVampire.addOffspring(offspring3);
      offspring3.addOffspring(offspring4);
      offspring3.addOffspring(offspring5);
      offspring5.addOffspring(offspring6);
      offspring6.addOffspring(offspring7);
      offspring2.addOffspring(offspring8);
    });

    it("should return an array of all vampires converted after 1980", () => {
      expect(rootVampire.allMillennialVampires.length).to.equal(4); //[offspring5, offspring6, offspring7, offspring8]
      expect(rootVampire.allMillennialVampires).to.include(offspring5);
      expect(rootVampire.allMillennialVampires).to.include(offspring6);
      expect(rootVampire.allMillennialVampires).to.include(offspring7);
      expect(rootVampire.allMillennialVampires).to.include(offspring8);
    });
  });
});
