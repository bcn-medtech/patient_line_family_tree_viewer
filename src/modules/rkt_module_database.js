export function initialize_family() {

    var family = {};

    family.id = "";
    family.name = "";
    family.description = "";
    family.symptoms = "";
    family.diagnosis = [];
    family.mutations = [];
    family.comments = "";
    family.num_family_members = 0;

    return family;

}

export function initialize_patient() {

    var patient = {};

    patient.id = "";
    patient.name = "";
    patient.gender = "";
    patient.father = "";
    patient.mother = "";
    patient.family_id = "";
    patient.center = "";
    patient.nhc = "";
    patient.dob = "";
    patient.mutations = "";
    patient.symptoms = "";
    patient.phenotype = "new-member-family";
    patient.genotype = "";
    patient.diagnosis = "";
    patient.diagnosis_status = "";
    patient.probando = "";
    patient.comments = "";
    patient.children = undefined;
    patient.num_relatives = undefined;

    return patient;

}