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
        currentFilters: `Εμφάνιση φίλτρων`,
        openInBrowser: `Άνοιγμα στο πρόγραμμα περιήγησης`,
        sellerContacts: `Επαφές πωλητή`,
        showDetails: `Εμφάνιση λεπτομερειών`,
        showMore: `Δείτε περισσότερα`,
        showOnMap: `Προβολή στο χάρτη`,
        continueSearch: `Συνέχιση αναζήτησης`,
    },
    info: {
        about: `Εάν θέλετε να μάθετε ποια φίλτρα μπορείτε να χρησιμοποιήσετε για να βρείτε την καλύτερη επιλογή για εσάς, απλά πείτε \*Πληροφορίες\*`,
        noMoreResultsReset: `Δεν υπάρχουν άλλα αποτελέσματα, πείτε "\*Επαναφορά\*" για να καθαρίσετε τα φίλτρα.`,
        noMoreResultsResetCommand: `Δεν υπάρχουν άλλα αποτελέσματα, μπορείτε να καθαρίσετε τα φίλτρα με την εντολή **Επαναφορά**`,
        showMoreResults: `Για να δείτε περισσότερα αποτελέσματα, απλά πείτε \*Δείτε περισσότερα\*`,
        showMoreResultsAndReset: `Για να δείτε περισσότερα αποτελέσματα, πείτε "\*Δείτε περισσότερα\*". Για να καθαρίσετε τα φίλτρα, πείτε "\*Επαναφορά\*"`,
        language: `English language, русский язык, українська мова, ελληνική γλώσσα, język polski`,
        continueSearch: `Για να συνεχίσετε την αναζήτηση, πείτε \*Συνέχιση αναζήτησης\*`,
    },
    help: [
        "Για να αλλάξετε γλώσσα, αναφέρετε τη γλώσσα στην οποία θέλετε το bot να αλληλεπιδρά μαζί σας. Για παράδειγμα, Μετάβαση στα Πολωνικά.",
        "Το bot μπορεί να μιλάει 5 γλώσσες: \n - Αγγλικά \n - Ελληνικά \n - Ρωσικά \n - Ουκρανικά \n - Πολωνικά",
        "Για να ξεκινήσετε την αναζήτηση, πρέπει να καθορίσετε την τοποθεσία, τον τύπο ιδιοκτησίας (σπίτι, βίλα, διαμέρισμα, εμπορική ιδιοκτησία, οικόπεδο), τον τύπο αγγελίας (ενοικίαση ή αγορά) και τον προϋπολογισμό. Για παράδειγμα, *Θέλω να αγοράσω σπίτι στη Λεμεσό, ο προϋπολογισμός μου είναι πάνω από 100 χιλιάδες ευρώ*",
        "Ακολουθεί μια λίστα με τα φίλτρα που μπορείτε να εισάγετε: \n" +
            `🔘 *Τύπος ιδιοκτησίας* \nΔιαμέρισμα, Βίλα, Μονοκατοικία, Διπλοκατοικία, Γραφείο, Ξενοδοχείο, Βιομηχανία, Εμπορικός Χώρος, Χώρος Εστίασης, Αποθήκη, Χώρος Στάθμευσης, Κατάστημα, Εστιατόριο, Άλλο Εμπορικό Ακίνητο, Οικόπεδο Εμπορικό, Οικόπεδο Κατοικίας, Οικόπεδο Γεωργίας \n💬 _"Ψάχνω διαμέρισμα"_\n\n` +
            `🔘 *Τύπος αγγελίας* \nΕνοικίαση, Βραχυχρόνια Ενοικίαση, Πώληση \n💬 _"Θέλω να αγοράσω"_\n\n` +
            `🔘 *Τιμή* \n💬 _"Προϋπολογισμός από 150k έως 200k ευρώ"_\n\n` +
            `🔘 *Επιπλωμένο* \nΧωρίς, Μερικώς, Πλήρως \n💬 _"Μερικώς επιπλωμένο"_\n\n` +
            `🔘 *Κατάσταση ιδιοκτησίας* \nΝέα, Μεταχειρισμένη \n💬 _"Νέα ιδιοκτησία"_\n\n` +
            `🔘 *Κατάσταση* \nΝέα, Σε καλή κατάσταση, Χρειάζεται ανακαίνιση \n💬 _"Σε καλή κατάσταση"_\n\n` +
            `🔘 *Σύστημα συναγερμού* \n💬 _"Με σύστημα ασφαλείας"_\n\n` +
            `🔘 *Κλιματισμός* \nΠαντού, Μόνο στα υπνοδωμάτια, Χωρίς \n💬 _"Χωρίς κλιματισμό"_\n\n` +
            `🔘 *Θέρμανση* \nΧωρίς, Κεντρική, Αέριο, Ηλεκτρική, Υγρό Καύσιμο \n💬 _"Με θέρμανση αερίου"_\n\n` +
            `🔘 *Θέρμανση νερού* \nΧωρίς, Κεντρική, Λέβητας, Ηλιακό Σύστημα, Φωτοβολταϊκό Σύστημα \n💬 _"Με κεντρική θέρμανση νερού"_\n\n` +
            `🔘 *Μπαλκόνι* \n💬 _"Με μπαλκόνι"_\n\n` +
            `🔘 *Έτος κατασκευής* \n💬 _"Κατασκευασμένο το 2024"_\n\n` +
            `🔘 *Κατάσταση κτιρίου* \nΈτοιμο για κατοίκηση, Υπό κατασκευή \n💬 _"Το κτίριο είναι υπό κατασκευή"_\n\n` +
            `🔘 *Κατάσταση* \nΝέο, Καλοδιατηρημένο, Χρειάζεται επισκευές \n💬 _"Καλοδιατηρημένο διαμέρισμα"_\n\n` +
            `🔘 *Κουζίνα* \n💬 _"Με κουζίνα"_\n\n` +
            `🔘 *Χώρος στάθμευσης* \n💬 _"Με χώρο στάθμευσης"_\n\n` +
            `🔘 *Εμβαδόν* \n💬 _"90 τετραγωνικά μέτρα"_\n\n` +
            `🔘 *Αριθμός δωματίων* \n💬 _"2-3 δωμάτια"_\n\n` +
            `🔘 *Αριθμός μπάνιων* \n💬 _"Δύο μπάνια"_\n\n` +
            `🔘 *Κατοικίδια* \n💬 _"Επιτρέπονται κατοικίδια"_\n\n` +
            `🔘 *Ρεύμα* \n💬 _"Με παροχή ρεύματος"_\n\n` +
            `🔘 *Ίντερνετ* \nΧωρίς, Wi-Fi, Ενσύρματο, Κινητό \n💬 _"Χρειάζομαι ενσύρματο ίντερνετ"_\n\n` +
            `🔘 *Χαρακτηριστικά περιοχής* \nΚοντά σε λίμνη, Κοντά στη θάλασσα, Κοντά σε πλαγιά, Κοντά σε σχολείο, Θέα, Κοντά στο αεροδρόμιο, Κοντά σε ποτάμι, Κοντά στο δάσος, Κοντά στο βουνό, Κοντά σε νηπιαγωγείο, Κοντά στο μετρό, Κοντά στο πάρκο, Κέντρο πόλης, Θέα στη θάλασσα, Ήσυχη περιοχή, Αριστοκρατική περιοχή, Κοντά σε σουπερμάρκετ \n💬 _"Κοντά στη θάλασσα"_\n\n` +
            `🔘 *Υποδομές* \nΑσφάλεια, Ξεχωριστή είσοδος, Χώρος μπάρμπεκιου, Γκολφ, Υπόγειος χώρος στάθμευσης, Γήπεδο τένις, Παιδική χαρά, Κάμερες ασφαλείας, Γυμναστήριο, Ασανσέρ, Εσωτερική πισίνα, Υποδοχή, Περιφραγμένη είσοδος, Ενδοδαπέδια θέρμανση, Βεράντα, Αειφόρος σχεδιασμός, Ηλιακά πάνελ, Θερμομόνωση, Υπόγειος χώρος, Ταράτσα, Κήπος, Γκαράζ, Οικόπεδο, Αποθήκη, Σάουνα \n💬 _"Κοντά σε γυμναστήριο"_\n\n` +
            `🔘 *Ανακαινίσεις* \nΜεγάλο μπαλκόνι, Μοντέρνος σχεδιασμός, Μεγάλη κουζίνα, Πανοραμικά παράθυρα, Μπάνιο με μπανιέρα, Ηλιακός θερμοσίφωνας, Λάμινατ στα υπνοδωμάτια \n💬 _"Με μοντέρνο σχεδιασμό"_ \n\n` +
            `🔘 *Επιπλέον χαρακτηριστικά* \nΗ καλύτερη τιμή, Διαπραγματεύσιμη, Χωρίς ΦΠΑ, Τίτλοι ιδιοκτησίας \n💬 _"Δείξε την καλύτερη τιμή"_\n\n`,
        `Για περισσότερες λεπτομέρειες σχετικά με ένα συγκεκριμένο ακίνητο, εισάγετε "*εμφάνιση ανά* _ID ακινήτου_". Μπορείτε επίσης να χρησιμοποιήσετε τις εντολές "*λεπτομέρειες για* _πρώτη|τελευταία_ *αγγελία*" μετά την εμφάνιση της λίστας.`,
        `Αν θέλετε να επανεκκινήσετε τη συνομιλία και να διαγράψετε όλες τις προηγούμενες πληροφορίες, απλά πείτε *Επαναφορά*`,
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
    general: {
        filters: "Εφαρμοσμένα φίλτρα στην αναζήτηση",
    },
    seller: {
        phone: "Τηλέφωνο",
        email: "Ηλεκτρονική διεύθυνση",
        site: "Ιστοσελίδα",
    },
    property: {
        airConditioning: {
            value: "Κλιματισμός",
            NO: "Όχι",
            EVERYWHERE: "Παντού",
            ONLY_BEDROOMS: "Μόνο στα υπνοδωμάτια",
            PROVISION: "Πρόβλεψη",
            YES: "Ναι",
        },
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
        propertyStatus: {
            value: "Κατάσταση ακινήτου",
            NEW: "Νέο",
            RESALE: "Μεταπώληση",
        },
        yearOfConstruction: "Έτος κατασκευής",
        density: `Πυκνότητα`,
        electricity: `Ηλεκτρισμός`,
        floorArea: `Επιφάνεια δαπέδου`,
        furnishing: {
            value: "Επίπλωση",
            NO: "Όχι",
            PARTLY: "Μερικώς",
            FULLY: "Πλήρως",
            YES: "Ναι",
        },
        gas: `Αέριο`,
        heating: {
            value: "Θέρμανση",
            NO: "Όχι",
            CENTRAL: "Κεντρική",
            GAS: "Αέριο",
            ELECTRIC: "Ηλεκτρική",
            LIQUID_FUEL: "Υγρό καύσιμο",
            YES: "Ναι",
        },
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
        internet: {
            value: "Ίντερνετ",
            NO: "Όχι",
            WIFI: "Wi-Fi",
            CABLE: "Καλωδιακό",
            MOBILE: "Κινητό",
            YES: "Ναι",
        },
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
        waterHeating: {
            value: "Θέρμανση νερού",
            NO: "Όχι",
            CENTRAL: "Κεντρικό",
            BOILER: "Θερμοσίφωνας",
            COMBINE: "Συνδυαστικό",
            SOLAR_SYSTEM: "Ηλιακό σύστημα",
            PHOTOVOLTAIC_SYSTEM: "Φωτοβολταϊκό σύστημα",
        },
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
