<div className="grid-block pl-component-card-family-header">
    <div className="grid-block vertical card-item">
                    
                    
                    <div className="grid-block shrink" style={{ "paddingTop": "20px", "paddingBottom": "8px" }}>
                        <PlComponentTextFieldEditable
                            text={family_diagnosis}
                            isEditionMode={mode_edit ? true : false}
                            isSearchBox={true}
                            suggestions={family_diagnosis_suggestions_json}
                            ref="family_diagnosis" />
                    </div>
                    <div className="grid-block shrink" style={{ "paddingTop": "20px" }}>
                        <PlComponentTextFieldEditable
                            text={family_genes}
                            isEditionMode={mode_edit ? true : false}
                            isSearchBox={true}
                            suggestions={family_genes_suggestions_json}
                            ref="family_genes" />

                    </div>
                    <div className="grid-block shrink" style={{ "paddingBottom": "8px" }}>
                        <PlComponentTextFieldEditable
                            text={family_mutations}
                            isEditionMode={mode_edit ? true : false}
                            ref="family_mutations" />
                    </div>
                    
    </div>

</div>