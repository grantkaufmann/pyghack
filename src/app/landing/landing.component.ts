import {Component, OnInit, OnDestroy} from '@angular/core';
import {Election, Party} from './types/index'
import { Papa } from 'ngx-papaparse';
import {reduce} from 'lodash-es';
//  const csv = require('csvtojson');

@Component({
  providers: [],
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})

export class LandingComponent implements OnInit, OnDestroy {
  //  Democratic	4	1
  public data = 'Position,Candidate,Party,Term Length,Vote For...,Official Website,Image\n' +
    'Governor and Lieutenant Governor,JB Pritzker & Juliana Stratton,Democratic,4,1,https://www.jbpritzker.com/,\n' +
    'Governor and Lieutenant Governor,Bruce Rauner & Evelyn Sanguinetti,Republican ,4,1,https://www.brucerauner.com/accomplishments/?utm_medium=search&utm_campaign=il-acc&utm_source=ad&utm_content=av&gclid=EAIaIQobChMI2NbuhITh3QIVAp7ACh1v_QXcEAAYAiAAEgJy4fD_BwE,\n' +
    'Governor and Lieutenant Governor,Grayson Kash Jackson & Sanjeev Mohip,Libertarian,4,1,https://www.kash2018.com/,\n' +
    'Governor and Lieutenant Governor,William \'Sam\' McCann & Aaron Merreighn,Conservative,4,1,https://mccannforillinois.com/,\n' +
    'Secretary of State,Jesse White,Democratic,4,1,http://www.cyberdriveillinois.com/,\n' +
    'Secretary of State,Jason Helland,Republican ,4,1,https://jasonhelland.com/,\n' +
    'Secretary of State,Steve Dutner,Libertarian,4,1,http://stevedutnerforil.com/,\n' +
    'Treasurer,Michael W. Frerichs,Democratic,4,1,https://www.illinoistreasurer.gov/,\n' +
    'Treasurer,Jim Dodge,Republican ,4,1,https://jimdodge.com/,\n' +
    'Treasurer,Michael Leheney,Libertarian,4,1,https://leheneyforillinois.com/,\n' +
    'County Executive,Darlene Kloeppel,Democratic,4,1,https://www.darlenekloeppel.com/,\n' +
    'County Executive,Gordy Hulten,Republican ,4,1,https://champaigncountyclerk.com/about,\n' +
    'County Clerk,Aaron Ammons,Democratic,4,1,https://www.aaronammons.com/,\n' +
    'County Clerk,Matt Grandone,Republican ,4,1,https://www.mattgrandone.com/,\n' +
    'County Treasurer,Laurel Lunt Prussing,Democratic,4,1,https://www.laurelprussing.com/,\n' +
    'County Treasurer,John Farney,Republican ,4,1,https://www.johnfarney.com/,\n' +
    'Sheriff,Dustin Heuerman,Democratic,4,1,https://www.dustinforsheriff.com/,\n' +
    'Sheriff,Allen E Jones,Republican ,4,1,https://www.voteallenjones.com/,\n' +
    '"Attorney General, State of Illinois",Kwame Raoul,Democratic,4,1,https://kwameraoul.com/,\n' +
    '"Attorney General, State of Illinois",Erika Harold,Republican ,4,1,https://erikaharold.com/get-involved/volunteer/?utm_medium=social&utm_source=gsn&utm_campaign=20171016_otr-lb-branded_adwords&utm_content=otr&gclid=EAIaIQobChMIot6_tZjh3QIVhzVpCh0kTAu9EAAYASAAEgJdLPD_BwE,\n' +
    '"Attorney General, State of Illinois",Bubba Harsy,Libertarian,4,1,https://bubbaharsyforillinois.com/,\n' +
    'Comptroller,Susana A. Mendoza,Democratic,4,1,https://illinoiscomptroller.gov/about/susana-a-mendoza/,\n' +
    'Comptroller,Darlene Senger,Republican ,4,1,https://darlenesenger.com/,\n' +
    'Comptroller,Claire Ball,Libertarian,4,1,http://claireballforillinois.com/,\n' +
    'Auditor,George Danos,Democratic,2,1,http://danosforauditor.com/,\n' +
    'Auditor,Diane Michaels,Republican ,2,1,https://www.champaigncountyrepublicans.org/diane-michaels-county-auditor,\n' +
    '"Representative In Congress, 13th Congressional District",Betsy Dirksen Londrigan,Democratic,2,1,https://www.betsydirksenlondrigan.com/,\n' +
    '"Representative In Congress, 13th Congressional District",Rodney Davis,Republican ,2,1,https://rodneydavis.house.gov/,\n' +
    '"Representative in the General Assembly, 103rd State Representative District",Carol Ammons,Democratic,2,1,https://www.carolammons.com/,\n' +
    'Regional Superintendent of Schools,Gary Lewis,Republican ,4,1,https://www.ballotready.org/il/regional-superintendent-of-schools-region-9/gary-lewis/,\n' +
    '"County Board Member, County Board District 8",Stephanie Fortado,Democratic,4,1,https://www.ballotready.org/il/champaign-county-board-member-district-8/stephanie-l-fortado/,\n' +
    '"Judge of the Appellate Court, 4th Judicial District (Representative In Congress, 13th Congressional District)","Thomas M. Harris, Jr.",Republican ,10,1,http://www.illinoiscourts.gov/AppellateCourt/Judges/Bio_HarrisT.asp,\n' +
    '"Judge of the Appellate Court, 4th Judicial District (To fill the vacancy of the\n' +
    'Hon. Arnold F. Blockman)",Ramona Sullivan,Democratic,6,1,https://ramonamsullivan.wixsite.com/mysite/,\n' +
    '"""Judge of the Appellate Court, 4th Judicial District (To fill the vacancy of the\n' +
    'Hon. Arnold F. Blockman)""",Roger B. Webber,Republican ,6,1,https://ballotpedia.org/Roger_B._Webber,\n' +
    'Judge of the Circuit Court 6th Judicial Circuit,Chad Beckett,Democratic,6,1,http://www.chadbeckett.com/,\n' +
    'Judge of the Circuit Court 6th Judicial Circuit,Randy Rosenbaum,Republican ,6,1,https://judgerandyrosenbaum.com/,';

  public events = [
    {
      label: 'event 1',
      date: '1541509200000',
      url: '.'
    },
    {
      label: 'event 2',
      date: '1541509200000',
      url: '.'
    },
    {
      label: 'event 3',
      date: '1541509200000',
      url: '.'
    }

  ];
  public electionList: Election[] = [
    {
      name: 'Governor and Lieutenant Governor',
      termLength: 4,
      cards: [
        {
          name: 'JB Pritzker & Juliana Stratton',
          pictureUrl: '../../assets/Governor/JB Pritzker.jpg',
          websiteUrl: 'https://www.jbpritzker.com/',
          party: Party.Democrat
        }
      ]
    }
  ];
  public decoratedData = [];
  //
  constructor(private papa: Papa) {
    //  console.log('csv', csv);
    // csv()
    //   .fromFile('../../assets/HeadsUpChambana.csv')
    //   .then((jsonObj)=>{
    //     console.log('jsonObj', jsonObj);
    //   })
    //  console.log('csvFile', csvFile);
    const csvData = '"Hello","World!"';
    this.papa.parse(this.data,{
      header: true,
      complete: (result) => {
        this.decorateData(result.data)
      }
    });
  }
  public ngOnInit() {}
  public ngOnDestroy() {}
  public decorateData(data) {
    console.log('data: ', data);

    const position = this.getUniqueValuesOfKey(data, 'Position');
    console.log('position', position);
    position.forEach((item) => {
      const canidates = data.filter((dataPoint) => item.election === dataPoint.Position);
      this.decoratedData.push({
        name: item.election,
        termLength: item.term,
        cards: this.getCards(canidates),
      });
    });
  }

  private getUniqueValuesOfKey(array: object[], key){
    let result = [];
    array.reduce((carry, item) => {
      if(item[key] && !~carry.indexOf(item[key])) {
        carry.push(item[key]);
        result.push({
          election: item[key],
          term: item['Term Length']
        });
      }
      return carry;
    }, []);
    return result;
  }
  private getCards(array) {
    console.log('array', array);
    return array.map((card) => {
      return {
        name: card.Candidate,
        pictureUrl: card.Image,
        websiteUrl: card['Official Website'],
        party: card.Party
      };
    });
  }
}
