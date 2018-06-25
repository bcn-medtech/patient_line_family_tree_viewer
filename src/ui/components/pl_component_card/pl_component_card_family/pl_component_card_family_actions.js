import { isObjectEmpty } from './../../../../modules/rkt_module_object';

export function format_family_statistics(initial_family_statistics, family_num_members, desired_length) {

    var family_statistics = [];
    var group = [];

    if (!isObjectEmpty(family_num_members)) {
        
        group.push({ "type": "family members", "text": family_num_members });
    }
    
    if (initial_family_statistics.length > desired_length) {

        for (var i = 0; i < initial_family_statistics.length; i++) {

            var stats = initial_family_statistics[i];

            if (group.length < desired_length) {

                group.push({ "type": stats["type"], "text": stats["text"] });

                if (group.length === desired_length) {

                    family_statistics.push(group);
                    group = [];
    
                } else if (i === initial_family_statistics.length - 1) {

                    family_statistics.push(group);
                    group = [];

                }

            }
        }

    } else {

        family_statistics.push(initial_family_statistics);

    }

    return family_statistics;

}