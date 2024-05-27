import {useEffect} from 'react';

//type
type TDCEDependentField = {
    fieldName: string;
    sectionFieldName: string; 
    draftFieldName: string; //use for draft
    defaultDispatchName: string; //name defined in store   
    nameResponseDefault: string; //name defined in store 
}

//configuration object
const dceDependentFieldsObj: TDCEDependentField[]  = [
    {
        fieldName: 'sales',
        sectionFieldName: 'generalInformation',
        draftFieldName: 'generalInformationDraftName',
        defaultDispatchName: 'getSalesDefault',
        nameResponseDefault: 'salesValues'
    },
    {
        fieldName: 'serviceAtLocation',
        sectionFieldName: 'wbsStructure.wbsFieldsDetails',
        draftFieldName: 'invoiceDraftName',
        defaultDispatchName: 'getInvoiceServiceAtLocationDefaults',
        nameResponseDefault: 'serviceAlLocationValues'
    },
]

//set DefaultValues For Nested Fields
const setDafaultsForNestedFields = (fieldName: string, sectionFieldName: string, draftFieldName: string, nameResponseDefault: string) => {
    //get values from store - response defaults for current field
    const responseDCEdefault = useSelector(nameResponseDefault);

   `${sectionFieldName}.${fieldName}`.map((item, idx) => {
       setValue(
           `${sectionFieldName}.${fieldName}${idx}.${fieldName}`,  
           `${responseDCEdefault}.${fieldName}`|| //value from defaults
           '',
           {
               shouldDirty: true,
           },
       );
       return item;
   });
};

const validatePreviusDependent = (newValuesDCEselected: string[], currentDCEvalue: string) => {
    return newValuesDCEselected.includes(currentDCEvalue)
}

//function to set default values
const setDefaultsDCE = (    
    fieldName: string, 
    sectionFieldName: string, 
    draftFieldName: string, 
    defaultDispatchName: string, 
    nameResponseDefault: string, 
    solToClientFake: string, 
    currentDCEvalues: string[], 
    fakeCurrentDCE: string,
    ) => {
    
    //dispath a new request for new DCE selected for the current field
    dispath(`${defaultDispatchName}`(fakeCurrentDCE));
       
    //get values from store - response new values for currentField with the new DCE selected
    const responseDCEdefault = useSelector(nameResponseDefault);

    //logic to set value
    if(sectionFieldName !== 'wbsStructure.wbsFieldsDetails') { //if field is not nested field
        //validate Previous dependent fields
        if(validatePreviusDependent(currentDCEvalues, fakeCurrentDCE)) { //if the new dce exist in new dec selection
            return;
        } else {
            //set value
            setValue(
                `${sectionFieldName}.${fieldName}`,
                    `${responseDCEdefault}.${fieldName}` ||   //value from defaults
                    solToClientFake || //value from header (soldToCLient)
                    '',               
                {
                    shouldDirty: true,
                },
            );
        }
           
    }

    if(sectionFieldName === 'wbsStructure.wbsFieldsDetails') {
        //validate Previous dependent fields
        if(validatePreviusDependent(currentDCEvalues, fakeCurrentDCE)) {
            return;
        } else {
            setDafaultsForNestedFields(fieldName, sectionFieldName, draftFieldName, nameResponseDefault);
        }
    }
 
}



//save current DCE in stor
//TO DO
const saveCurrentDCEinStore = () => {
    //get current dce from draft
    //dispatch saveGeneralInformationForm --> save current dce field in general information form store
}

//hook
export const useSetDefaultsDCEDependents = () => {
    //call draft forms from store
    //TO DO

    //call current DCE values from store
    //TO DO
    const fakeCurrentDCEvalues = ['DCE1', 'DCE2']

    //call current DCE selected
    //TO DO
    let fakeCurrentDCE = 'DCE1';

    //call header value 'soldToClient' from store
    //TO DO
    const solToClientFake = '1';

    useEffect(() => {
        //dependet dce fields iteration for set default values in store and validate setValues in each field
        dceDependentFieldsObj.forEach((dependentField:TDCEDependentField) => {
            setDefaultsDCE(
                dependentField.fieldName, 
                dependentField.sectionFieldName, 
                dependentField.draftFieldName, 
                dependentField.defaultDispatchName, 
                dependentField.nameResponseDefault, 
                solToClientFake, fakeCurrentDCEvalues,
                fakeCurrentDCE
            )
        }, [fakeCurrentDCE])    
    } )
}