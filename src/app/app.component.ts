import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders: [MatIconRegistry]
})



export class AppComponent {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  page ;


  @ViewChild('sidenav') sidenav: MatSidenav;
  close() {
    this.sidenav.close();
  }
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private _formBuilder: FormBuilder) {

    console.log('registering  play button icon');
    iconRegistry.addSvgIcon('home',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/images/home.svg'));
    iconRegistry.addSvgIcon('moreSvg',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/images/more.svg'));

      this.page =2;

  }

  onRowClicked(item){

    this.page =item;

    this.close();
      

    
  }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }



  soapCall() {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.open('POST', 'http://localhost:8080/ProductCatalogSoapService/services/ProductCatalogServiceImpl', true);
    // let input_element = <HTMLInputElement> document.getElementById("choosenNumber");

    // console.log("chVal : " + input_element.value);
    // let choosenNumberValue = input_element.value;
    //the following variable contains my xml soap request (that you can get thanks to SoapUI for example)
    let sr =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ani="http://ani.com">
        <soapenv:Header/>
        <soapenv:Body>
           <ani:getAllProducts/>
        </soapenv:Body>
     </soapenv:Envelope>`;

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          let xml = xmlhttp.responseXML;
          // let response_number = parseInt(xml.getElementsByTagName("return")[0].childNodes[0].nodeValue); //Here I'm getting the value contained by the <return> node

          console.log("soap response", xml.getElementsByTagName("getAllProductsResponse")); //I'm printing my result square number

          let xmlDoc =xml.getElementsByTagName("getAllProductsResponse");
      
                // let domparser = new DOMParser();
                // let doc= domparser.parseFromString(JSON.stringify(xmlDoc), 'text/xml');
                // let elements = doc.querySelectorAll("*");
                // console.log("elements",elements);

                let arr = Array.from(xmlDoc);

                let resArr=  Array.from(arr[0].getElementsByTagName("getAllProductsReturn"));

                let Element;
                for(let i=0;i<resArr.length;i++){

                  console.log(Array.from(resArr[i].getElementsByTagName('category'))[0]);
                }

              
            }
        }
    }
// Send the POST request
xmlhttp.setRequestHeader('SOAPAction', '');
xmlhttp.setRequestHeader('Content-Type', 'text/xml');
xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'POST, GET, OPTIONS, PUT');
// xmlhttp.setRequestHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// xmlhttp.responseType = "document";
xmlhttp.send(sr);
  }

}

export interface Element {
  category: string;
  id : number;
  name: string;
  unitPrice: number;
}
