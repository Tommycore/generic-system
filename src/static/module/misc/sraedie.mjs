export class SraeDie extends DiceTerm
{
  constructor(termData)
  {
    super(termData);
    this.faces = 6;
  }

  static DENOMINATION = "s";
  static FACES =
  {
    "1": "x",
    "2": "&nbsp;",
    "3": "&nbsp;",
    "4": "&nbsp;",
    "5": "+",
    "6": "+"
  }

  static MODIFIERS = {
    "r": "rerolls"
  }

  roll({minimize=false, maximize=false}={})
  {
    const roll = {result: 0, active: true};

    if ( minimize )
    {
      roll.result = 1;
    }
    else if ( maximize )
    {
      roll.result = 6;
    }
    else
    {
      roll.result = Math.ceil(Number(CONFIG.Dice.randomUniform()) * this.faces);
    }

    if ( roll.result === 1 )
    {
      roll.failure = true;
    }
    else if ( roll.result > 4 )
    {
      roll.success = true;
    }

    this.results.push(roll);

    // Count successes.
    DiceTerm._applyCount(this.results, ">", 4, {flagSuccess: true, flagFailure: false});
    return roll;
  }

  rerolls(modifier)
  {
    //console.log(modifier);
  }

  getResultLabel(result)
  {
    return SraeDie.FACES[result.result];
  }

  get total()
  {
    if (!this._evaluated)
    {
      return undefined;
    }

    return this.results.filter(el => el.success).length;

    // return this.results.reduce((t, r) => {
    //   if ( !r.active ) return t;
    //   if ( r.count !== undefined ) return t + r.count;
    //   else return t + r.result;
    // }, 0);
  }

  get oneCount()
  {
    return this.results.filter( el => el.failure ).length;
  }

  get fumbleLvl()
  {
    let result = 0;
    return (this.oneCount > (this.results.length / 2)) ? (this.total === 0 ? 2 : 1) : 0;
  }
}