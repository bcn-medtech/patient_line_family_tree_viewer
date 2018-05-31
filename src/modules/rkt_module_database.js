export function initialize_family() {

    var family = {};

    family.id = "";
    family.name = "";
    family.description = "";
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
    patient.married_with = "";
    patient.family_id = "";
    patient.center = "";
    patient.nhc = "";
    patient.dob = " ";
    patient.mutations = "";
    patient.symptoms = "";
    patient.status = "nuevo-miembro-familia";
    patient.diagnostic = "";
    patient.diagnostic_status = "";
    patient.probando = "";
    patient.children = undefined;
    patient.num_relatives = undefined;

    return patient;

}