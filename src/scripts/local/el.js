/** @type {Translation} */
export default {
    fetchErrors: {
        notFoundCityInCountry: (country) =>
            `Συγγνώμη, δεν βρέθηκαν πόλεις στην ${country}. Παρακαλώ δοκιμάστε ξανά.`,
        invalidPositionValue: `Μη έγκυρη τιμή θέσης.`,
        listing: `Κάτι πήγε στραβά, παρακαλώ δοκιμάστε ξανά αργότερα. Συγγνώμη.`,
        noMoreListing: `Συγγνώμη, δεν υπάρχουν άλλες διαθέσιμες καταχωρίσεις βάσει του αιτήματός σας.`,
        noSearchRequest: `Δεν ξέρω ποιες ιδιότητες μπορώ να σας δείξω, πρέπει πρώτα να κάνετε αίτημα αναζήτησης.`,
        seller: `Συγγνώμη, δεν μπορώ να πάρω πληροφορίες πωλητή.`,
    },
    buttons: {
        clearFilters: `Καθαρισμός φίλτρων`,
        currentFilters: `Φίλτρα`,
        openInBrowser: `Άνοιγμα στο πρόγραμμα περιήγησης`,
        sellerContacts: `Επαφές πωλητή`,
        showDetails: `Εμφάνιση λεπτομερειών`,
        showMore: `Δείτε περισσότερα`,
        showOnMap: `Προβολή στο χάρτη`,
    },
    info: {
        about: `Εάν θέλετε να μάθετε ποια φίλτρα μπορείτε να χρησιμοποιήσετε για να βρείτε την καλύτερη επιλογή για εσάς, απλά πείτε \*Πληροφορίες\*`,
        noMoreResultsReset: `Δεν υπάρχουν άλλα αποτελέσματα, πείτε "\*Επαναφορά\*" για να καθαρίσετε τα φίλτρα.`,
        noMoreResultsResetCommand: `Δεν υπάρχουν άλλα αποτελέσματα, μπορείτε να καθαρίσετε τα φίλτρα με την εντολή **Επαναφορά**`,
        showMoreResults: `Για να δείτε περισσότερα αποτελέσματα, απλά πείτε \*Δείτε περισσότερα\*`,
        showMoreResultsAndReset: `Για να δείτε περισσότερα αποτελέσματα, πείτε "\*Δείτε περισσότερα\*". Για να καθαρίσετε τα φίλτρα, πείτε "\*Επαναφορά\*"`,
        language: `English language, русский язык, українська мова, ελληνική γλώσσα, język polski`,
    },
    help: [
        "Για να αλλάξετε γλώσσα, γράψτε τη γλώσσα στην οποία θέλετε να αλληλεπιδρά ο bot σας μαζί σας. Για παράδειγμα, Αλλάξτε σε Ελληνικά",
        "Ο bot μπορεί να μιλήσει 5 γλώσσες: \n - Αγγλικά \n - Ελληνικά \n - Ρωσικά \n - Ουκρανικά \n - Πολωνικά",
        "Για να ξεκινήσετε την αναζήτηση, πρέπει να αναφέρετε την τοποθεσία, τον τύπο ακινήτου (σπίτι, βίλα, διαμέρισμα, εμπορικό, οικόπεδο), τον τύπο καταχώρισης (ενοικίαση ή αγορά) και τον προϋπολογισμό. Για παράδειγμα, *Θέλω να αγοράσω ένα σπίτι στη Λεμεσό με προϋπολογισμό πάνω από 10.000 δολάρια*",
        "Ακολουθεί η λίστα με τα οφέλη που μπορείτε να πληκτρολογήσετε: \n - Σύστημα συναγερμού \n - Κλιματισμός *(Παντού, Μόνο στα υπνοδωμάτια, Όχι)* \n - Μπαλκόνι \n - Κατάσταση κτιρίου *(Έτοιμο για μετακόμιση, Υπό κατασκευή)* \n - Κατάσταση *(Νέο, Καλά συντηρημένο, Χρειάζεται ανακαίνιση)* \n - Κουζίνα \n - Πάρκινγκ \n - Φυσικό αέριο \n - Ηλεκτρισμός \n - Internet *(Όχι, Wi-Fi, Καλωδιακό, Κινητό)* \n - Θέρμανση *(Όχι, Κεντρική, Αέριο, Ηλεκτρική, Υγρό καύσιμο)* \n - Θέρμανση νερού *(Όχι, Κεντρική, Λέβητας, Ηλιακό σύστημα, Φωτοβολταϊκό σύστημα)* \n - Παροχές *(Κοντά στο σχολείο, Κοντά στο πάρκο, Ήσυχη περιοχή, Στο κέντρο, Θέση πάρκινγκ, Όμορφη θέα, Σάουνα, Θέα στη θάλασσα, Ασφάλεια, Αποθήκη, Κοντά στο μετρό, Κοντά στο νηπιαγωγείο, Κοντά στη θάλασσα, Κοντά στη λίμνη, Με κήπο, Με γκαράζ)*",
        "Εάν, κατά την προσθήκη παραμέτρων σε ένα ερώτημα, κάποια στιγμή δεν βρείτε αποτελέσματα αναζήτησης, μπορείτε να ακυρώσετε την τελευταία εισαγόμενη τιμή χρησιμοποιώντας την εντολή *Αναίρεση*.",
        `Για να λάβετε περισσότερες λεπτομέρειες για ένα συγκεκριμένο ακίνητο, πληκτρολογήστε "*εμφάνιση ανά* _id ακινήτου_". Μπορείτε επίσης να χρησιμοποιήσετε τις εντολές "*λεπτομέρειες για* _πρώτη|τελευταία_ *μία*" μετά την εμφάνιση της καταχώρισης.`,
        "Εάν θέλετε να επανεκκινήσετε τη συνομιλία και να διαγράψετε όλες τις προηγούμενες πληροφορίες, απλά πείτε *Επαναφορά*",
    ],
    hello: [
        `Γειά σου! Είμαι ο βοηθός σου για τα ακίνητα. Θέλεις να νοικιάσεις ή να αγοράσεις ακίνητο;`,
        `Γειά! Είμαι εδώ για να σε βοηθήσω να βρεις το ιδανικό σπίτι. Σχεδιάζεις να νοικιάσεις ή να αγοράσεις;`,
        `Καλημέρα! Είμαι έτοιμος να σε βοηθήσω να επιλέξεις ακίνητο. Σε ενδιαφέρει η ενοικίαση ή η αγορά;`,
        `Χαιρετισμοί! Ψάχνεις για νέο διαμέρισμα; Πες μου τι χρειάζεσαι και θα σε βοηθήσω να βρεις την καλύτερη επιλογή.`,
        `Γειά σου! Είμαι ο βοηθός σου για τα ακίνητα με AI. Πώς μπορώ να σε βοηθήσω - ενοικίαση ή αγορά;`,
    ],
    bye: [
        "Ευχαριστώ που επικοινώνησες μαζί μου! Καλή τύχη στην αναζήτηση κατοικίας σου!",
        "Όλα τα καλά! Αν έχεις περισσότερες ερωτήσεις, μην διστάσεις να ρωτήσεις.",
        "Ελπίζω να μπόρεσα να βοηθήσω. Καλή μέρα!",
        "Αντίο! Καλή τύχη με την ενοικίαση ή την αγορά του νέου διαμερίσματός σου!",
        "Ευχαριστώ για το χρόνο σου! Αν χρειαστείς περαιτέρω βοήθεια, είμαι πάντα εδώ.",
        "Θα τα πούμε σύντομα! Καλή τύχη στην αναζήτηση κατοικίας σου!",
        "Χαίρομαι που μπόρεσα να βοηθήσω! Όλα τα καλύτερα στην αναζήτηση κατοικίας σου.",
        "Αντίο! Ελπίζω να βρεις σύντομα το ιδανικό σου σπίτι.",
        "Ευχαριστώ που επικοινώνησες! Αν έχεις περισσότερες ερωτήσεις, είμαι εδώ για να βοηθήσω.",
        "Όλα τα καλά! Ελπίζω η αναζήτηση ακινήτου σου να είναι επιτυχής.",
    ],
    noMatch: [
        "Συγγνώμη, δεν κατάλαβα την εντολή σου. Μπορείς να διευκρινίσεις τι ακριβώς ήθελες να μάθεις ή να κάνεις; Για παράδειγμα, ψάχνεις για πληροφορίες σχετικά με ακίνητα ή έχεις άλλο αίτημα;",
        "Λυπάμαι, αλλά δεν αναγνώρισα αυτή την εντολή. Μπορείς να εξηγήσεις περαιτέρω τι προσπαθούσες να κάνεις; Για παράδειγμα, θέλεις να βρεις διαμέρισμα για ενοικίαση ή για πώληση, ή έχεις άλλες ερωτήσεις σχετικά με τα ακίνητα;",
        "Δεν κατάλαβα την εντολή σου. Μπορείς να διευκρινίσεις το αίτημά σου; Για παράδειγμα, ψάχνεις πληροφορίες για την αγορά ακινήτων, ή έχεις συγκεκριμένες απαιτήσεις για κατοικία;",
    ],
    getProperty: {
        area: `Ποια περιοχή σε ενδιαφέρει;`,
        bedrooms: `Πόσα υπνοδωμάτια χρειάζεσαι;`,
        budget: `Ποιος είναι ο προϋπολογισμός σου;`,
        coverageRatio: `Ποιες είναι οι προτιμήσεις για τον συντελεστή κάλυψης;`,
        country: `Would you like to check all the option in this country?`,
        density: `Ποια πυκνότητα κτιρίων χρειάζεσαι;`,
        floorNumber: `Σε ποιους ορόφους θα ήθελες να βρεις τα ακίνητα;`,
        id: `Παρακαλώ παρέχετε το ID του ακινήτου.`,
        listingType: `Τι τύπο ιδιοκτησίας σε ενδιαφέρει: αγορά ή ενοικίαση;`,
        location: `Σε ποια πόλη θα ήθελες να δεις το ακίνητο;`,
        propertyType: `Τι τύπο ακινήτου σε ενδιαφέρει: διαμέρισμα, σπίτι, βίλα, εμπορικό, οικόπεδο;`,
        residentialFloors: `Σε ποιους ορόφους θα ήθελες να βρίσκονται τα κατοικημένα διαμερίσματα;`,
        language: `Ποια γλώσσα διεπαφής θέλετε να επιλέξετε;`,
    },
    property: {
        general: {
            filters: "Εφαρμοσμένα φίλτρα στην αναζήτηση",
        },
        airConditioning: `Κλιματισμός`,
        alarmSystem: `Σύστημα συναγερμού`,
        area: `Περιοχή ακινήτου`,
        balcony: `Μπαλκόνι`,
        bathrooms: `Μπάνια`,
        bedrooms: `Υπνοδωμάτια`,
        buildigConditions: {
            value: `Κατάσταση κτιρίου`,
            READY_TO_MOVE_IN: `Έτοιμο προς μετακόμιση`,
            UNDER_CONSTRUCTION: `Υπό κατασκευή`,
            NEEDS_RENOVATION: `Χρειάζεται ανακαίνιση`,
            RENOVATED: `Ανακαινισμένο`,
        },
        coverageRatio: `Συντελεστής κάλυψης`,
        density: `Πυκνότητα`,
        electricity: `Ηλεκτρισμός`,
        floorArea: `Επιφάνεια δαπέδου`,
        furnishing: `Επίπλωση`,
        gas: `Αέριο`,
        heating: `Θέρμανση`,
        infrastructureAmenities: {
            value: "Παροχές υποδομής",
            SECURITY: "Ασφάλεια",
            SEPARATE_ENTRANCE: "Ξεχωριστή είσοδος",
            BBQ_AREA: "Χώρος BBQ",
            GOLF: "Γκολφ",
            UNDERGROUND_PARKING: "Υπόγειος χώρος στάθμευσης",
            TENNIS_COURT: "Γήπεδο τένις",
            PLAYGROUND: "Παιδική χαρά",
            CCTV: "Κάμερες ασφαλείας",
            GYM: "Γυμναστήριο",
            ELEVATOR: "Ανελκυστήρας",
            INDOOR_POOL: "Εσωτερική πισίνα",
            RECEPTION: "Υποδοχή",
            GATED_ENTRANCE: "Περιφραγμένη είσοδος",
            UNDERFLOOR_HEATING: "Ενδοδαπέδια θέρμανση",
            TERRACE: "Βεράντα",
            SUSTAINABLE_DESIGN: "Βιώσιμος σχεδιασμός",
            PHOTOVOLTAIC_PROVISIONS: "Φωτοβολταϊκά συστήματα",
            THERMAL_INSULATION: "Θερμομόνωση",
            WITH_BASEMENT: "Με υπόγειο",
            ROOF_TERRACE: "Βεράντα οροφής",
            WITH_GARDEN: "Με κήπο",
            WITH_GARAGE: "Με γκαράζ",
            WITH_PLOT: "Με οικόπεδο",
            STORAGE: "Αποθήκη",
            SAUNA: "Σάουνα",
        },
        internet: `Ίντερνετ`,
        kitchen: `Κουζίνα`,
        parking: `Πάρκινγκ`,
        repairAmenities: {
            value: "Χαρακτηριστικά επισκευής",
            BIG_BALCONY: "Μεγάλο μπαλκόνι",
            MODERN_DESIGN: "Μοντέρνος σχεδιασμός",
            BIG_KITCHEN: "Μεγάλες κουζίνα",
            PANORAMIC_WINDOWS: "Πανόραμικα παράθυρα",
            EN_SUITE_BATHROOM: "Μπάνιο με σουίτα",
            SOLAR_POWERED_WATER_BOILER: "Ηλιακός θερμοσίφωνας",
            LAMINATED_FLOORS_IN_ALL_BEDROOMS: "Λαμινάτο σε όλα τα υπνοδωμάτια",
        },
        residentialFloors: `Κατοικημένοι όροφοι`,
        sewageSystem: `Αποχετευτικό σύστημα`,
        television: `Τηλεόραση`,
        water: `Νερό`,
        waterHeating: `Θέρμανση νερού`,
        location: `Τοποθεσία`,
        locationFeatures: {
            value: "Χαρακτηριστικά τοποθεσίας",
            NEAR_THE_LAKE: "Κοντά στη λίμνη",
            NEAR_THE_SEA: "Κοντά στη θάλασσα",
            NEAR_THE_SLOPE: "Κοντά στην πλαγιά",
            NEAR_THE_SCHOOL: "Κοντά στο σχολείο",
            BEAUTIFUL_VIEW: "Ωραία θέα",
            NEAR_THE_AIRPORT: "Κοντά στο αεροδρόμιο",
            NEAR_THE_RIVER: "Κοντά στον ποταμό",
            NEAR_THE_FOREST: "Κοντά στο δάσος",
            NEAR_THE_MOUNTAINS: "Κοντά στα βουνά",
            NEAR_THE_KINDERGARTEN: "Κοντά στον παιδικό σταθμό",
            NEAR_THE_SUBWAY: "Κοντά στο μετρό",
            NEAR_THE_PARK: "Κοντά στο πάρκο",
            CITY_CENTER: "Κέντρο πόλης",
            SEA_VIEW: "Θέα στη θάλασσα",
            CALM_DISTRICT: "Ήσυχη περιοχή",
            PRESTIGIOUS_DISTRICT: "Πολυτελής περιοχή",
            NEAR_THE_SUPERMARKET: "Κοντά στο σούπερ μάρκετ",
        },
        swimmingPool: "Πισίνα",
        price: {
            value: `Τιμή`,
            budget: `Προϋπολογισμός`,
        },
        listingType: {
            value: `Τύπος ιδιοκτησίας`,
            RENT: `Ενοικίαση`,
            SHORT_RENT: `Βραχυχρόνια ενοικίαση`,
            SALE: `Πώληση`,
        },
        propertyType: {
            value: `Τύπος ακινήτου`,
            APARTMENT: `Διαμέρισμα`,
            VILLA: `Βίλα`,
            DETACHED_HOUSE: `Ανεξάρτητο σπίτι`,
            SEMIDETACHED_HOUSE: `Ημι-ανεξάρτητο σπίτι`,
            OFFICE: `Γραφείο`,
            HOTEL: `Ξενοδοχείο`,
            MANUFACTURING: `Βιομηχανία`,
            RETAIL_SPACE: `Εμπορικός χώρος`,
            PUBLIC_CATERING_FACILITY: `Δημόσιος χώρος εστίασης`,
            WAREHOUSE: `Αποθήκη`,
            CAR_PARKING: `Χώρος στάθμευσης`,
            SHOP: `Κατάστημα`,
            RESTAURANT: `Εστιατόριο`,
            OTHER_COMMERCIAL: `Άλλο εμπορικό`,
            COMMERCIAL_PLOT: `Εμπορικό οικόπεδο`,
            RESIDENTIAL_PLOT: `Οικόπεδο κατοικίας`,
            AGRICULTURE_PLOT: `Γεωργικό οικόπεδο`,
        },
    },
};
