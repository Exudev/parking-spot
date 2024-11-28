type VehicleModel = {
    name: string;
    minYear: number;
    maxYear: number;
  };
  
  // Tipo para la marca de vehículo
  type VehicleBrand = {
    name: string;
    models: VehicleModel[];
  };

function getModelsForBrand(brand: string): VehicleModel[] | undefined {
    const foundBrand = vehicleBrands.find((b) => b.name === brand);
    return foundBrand ? foundBrand.models : undefined;
  }
const vehicleBrands: VehicleBrand[] = [
    { name: "Toyota", models: [{ name: "Corolla", minYear: 1990, maxYear: 2023 }, { name: "Camry", minYear: 1992, maxYear: 2024 }, { name: "RAV4", minYear: 1996, maxYear: 2024 }, { name: "Highlander", minYear: 2001, maxYear: 2024 }, { name: "Tacoma", minYear: 1995, maxYear: 2024 }] },
    { name: "Ford", models: [{ name: "Fiesta", minYear: 1976, maxYear: 2020 }, { name: "Mustang", minYear: 1965, maxYear: 2024 }, { name: "Explorer", minYear: 1991, maxYear: 2023 }, { name: "Escape", minYear: 2000, maxYear: 2024 }, { name: "F-150", minYear: 1975, maxYear: 2024 }] },
    { name: "BMW", models: [{ name: "X5", minYear: 1999, maxYear: 2023 }, { name: "X3", minYear: 2003, maxYear: 2024 }, { name: "Series 3", minYear: 1975, maxYear: 2024 }, { name: "Series 5", minYear: 1972, maxYear: 2024 }, { name: "i8", minYear: 2014, maxYear: 2020 }] },
    { name: "Mercedes-Benz", models: [{ name: "C-Class", minYear: 1993, maxYear: 2024 }, { name: "E-Class", minYear: 1984, maxYear: 2024 }, { name: "S-Class", minYear: 1972, maxYear: 2024 }, { name: "GLA", minYear: 2014, maxYear: 2024 }, { name: "GLE", minYear: 1997, maxYear: 2024 }] },
    { name: "Honda", models: [{ name: "Civic", minYear: 1972, maxYear: 2024 }, { name: "Accord", minYear: 1976, maxYear: 2024 }, { name: "CR-V", minYear: 1995, maxYear: 2024 }, { name: "Pilot", minYear: 2002, maxYear: 2024 }, { name: "Fit", minYear: 2001, maxYear: 2020 }] },
    { name: "Chevrolet", models: [{ name: "Malibu", minYear: 1964, maxYear: 2024 }, { name: "Silverado", minYear: 1999, maxYear: 2024 }, { name: "Equinox", minYear: 2005, maxYear: 2024 }, { name: "Tahoe", minYear: 1995, maxYear: 2024 }, { name: "Camaro", minYear: 1966, maxYear: 2024 }] },
    { name: "Nissan", models: [{ name: "Altima", minYear: 1992, maxYear: 2024 }, { name: "Sentra", minYear: 1982, maxYear: 2024 }, { name: "Rogue", minYear: 2007, maxYear: 2024 }, { name: "Pathfinder", minYear: 1985, maxYear: 2024 }, { name: "Frontier", minYear: 1997, maxYear: 2024 }] },
    { name: "Volkswagen", models: [{ name: "Golf", minYear: 1974, maxYear: 2024 }, { name: "Passat", minYear: 1973, maxYear: 2024 }, { name: "Jetta", minYear: 1979, maxYear: 2024 }, { name: "Tiguan", minYear: 2007, maxYear: 2024 }, { name: "Atlas", minYear: 2017, maxYear: 2024 }] },
    { name: "Hyundai", models: [{ name: "Elantra", minYear: 1990, maxYear: 2024 }, { name: "Sonata", minYear: 1985, maxYear: 2024 }, { name: "Tucson", minYear: 2004, maxYear: 2024 }, { name: "Santa Fe", minYear: 2000, maxYear: 2024 }, { name: "Kona", minYear: 2017, maxYear: 2024 }] },
    { name: "Kia", models: [{ name: "Sorento", minYear: 2002, maxYear: 2024 }, { name: "Sportage", minYear: 1993, maxYear: 2024 }, { name: "Optima", minYear: 2000, maxYear: 2020 }, { name: "Soul", minYear: 2008, maxYear: 2024 }, { name: "Telluride", minYear: 2019, maxYear: 2024 }] },
    { name: "Subaru", models: [{ name: "Outback", minYear: 1994, maxYear: 2024 }, { name: "Forester", minYear: 1997, maxYear: 2024 }, { name: "Impreza", minYear: 1992, maxYear: 2024 }, { name: "Legacy", minYear: 1989, maxYear: 2024 }, { name: "Crosstrek", minYear: 2012, maxYear: 2024 }] },
    { name: "Mazda", models: [{ name: "Mazda3", minYear: 2003, maxYear: 2024 }, { name: "Mazda6", minYear: 2002, maxYear: 2021 }, { name: "CX-5", minYear: 2012, maxYear: 2024 }, { name: "MX-5 Miata", minYear: 1989, maxYear: 2024 }, { name: "CX-9", minYear: 2006, maxYear: 2024 }] },
    { name: "Audi", models: [{ name: "A4", minYear: 1994, maxYear: 2024 }, { name: "Q5", minYear: 2008, maxYear: 2024 }, { name: "A6", minYear: 1994, maxYear: 2024 }, { name: "Q7", minYear: 2005, maxYear: 2024 }, { name: "A3", minYear: 1996, maxYear: 2024 }] },
    { name: "Jeep", models: [{ name: "Wrangler", minYear: 1986, maxYear: 2024 }, { name: "Cherokee", minYear: 1974, maxYear: 2024 }, { name: "Grand Cherokee", minYear: 1992, maxYear: 2024 }, { name: "Compass", minYear: 2007, maxYear: 2024 }, { name: "Renegade", minYear: 2014, maxYear: 2024 }] },
    { name: "Dodge", models: [{ name: "Charger", minYear: 1966, maxYear: 2024 }, { name: "Challenger", minYear: 1970, maxYear: 2024 }, { name: "Durango", minYear: 1998, maxYear: 2024 }, { name: "Journey", minYear: 2009, maxYear: 2020 }, { name: "Ram", minYear: 1981, maxYear: 2024 }] },
    { name: "Lexus", models: [{ name: "RX", minYear: 1998, maxYear: 2024 }, { name: "ES", minYear: 1989, maxYear: 2024 }, { name: "NX", minYear: 2014, maxYear: 2024 }, { name: "IS", minYear: 1998, maxYear: 2024 }, { name: "GX", minYear: 2002, maxYear: 2024 }] },
    { name: "Tesla", models: [{ name: "Model S", minYear: 2012, maxYear: 2024 }, { name: "Model 3", minYear: 2017, maxYear: 2024 }, { name: "Model X", minYear: 2015, maxYear: 2024 }, { name: "Model Y", minYear: 2020, maxYear: 2024 }, { name: "Cybertruck", minYear: 2023, maxYear: 2024 }] },
    { name: "GMC", models: [{ name: "Sierra", minYear: 1998, maxYear: 2024 }, { name: "Terrain", minYear: 2009, maxYear: 2024 }, { name: "Yukon", minYear: 1991, maxYear: 2024 }, { name: "Acadia", minYear: 2007, maxYear: 2024 }, { name: "Canyon", minYear: 2004, maxYear: 2024 }] },
    { name: "Volvo", models: [{ name: "XC90", minYear: 2002, maxYear: 2024 }, { name: "XC60", minYear: 2008, maxYear: 2024 }, { name: "S60", minYear: 2000, maxYear: 2024 }, { name: "V60", minYear: 2010, maxYear: 2024 }, { name: "XC40", minYear: 2017, maxYear: 2024 }] },
    { name: "Land Rover", models: [{ name: "Range Rover", minYear: 1970, maxYear: 2024 }, { name: "Discovery", minYear: 1989, maxYear: 2024 }, { name: "Defender", minYear: 1983, maxYear: 2024 }, { name: "Range Rover Sport", minYear: 2005, maxYear: 2024 }, { name: "Evoque", minYear: 2011, maxYear: 2024 }] },
    { name: "Porsche", models: [{ name: "911", minYear: 1963, maxYear: 2024 }, { name: "Cayenne", minYear: 2002, maxYear: 2024 }, { name: "Macan", minYear: 2014, maxYear: 2024 }, { name: "Panamera", minYear: 2009, maxYear: 2024 }, { name: "Taycan", minYear: 2019, maxYear: 2024 }] },
    { name: "Jaguar", models: [{ name: "XE", minYear: 2015, maxYear: 2024 }, { name: "XF", minYear: 2007, maxYear: 2024 }, { name: "F-Pace", minYear: 2016, maxYear: 2024 }, { name: "I-Pace", minYear: 2018, maxYear: 2024 }, { name: "E-Pace", minYear: 2017, maxYear: 2024 }] },
    { name: "Cadillac", models: [{ name: "Escalade", minYear: 1999, maxYear: 2024 }, { name: "XT5", minYear: 2016, maxYear: 2024 }, { name: "CTS", minYear: 2002, maxYear: 2019 }, { name: "XT4", minYear: 2018, maxYear: 2024 }, { name: "CT5", minYear: 2020, maxYear: 2024 }] },
    { name: "Mitsubishi", models: [{ name: "Outlander", minYear: 2001, maxYear: 2024 }, { name: "Lancer", minYear: 1973, maxYear: 2017 }, { name: "Eclipse Cross", minYear: 2017, maxYear: 2024 }, { name: "Pajero", minYear: 1982, maxYear: 2021 }, { name: "Mirage", minYear: 1978, maxYear: 2024 }] },
    { name: "Chrysler", models: [{ name: "300", minYear: 2004, maxYear: 2024 }, { name: "Pacifica", minYear: 2016, maxYear: 2024 }, { name: "Voyager", minYear: 1984, maxYear: 2024 }, { name: "Aspen", minYear: 2007, maxYear: 2009 }, { name: "Concorde", minYear: 1993, maxYear: 2004 }] },
    { name: "Infiniti", models: [{ name: "Q50", minYear: 2013, maxYear: 2024 }, { name: "QX60", minYear: 2012, maxYear: 2024 }, { name: "QX80", minYear: 2010, maxYear: 2024 }, { name: "QX50", minYear: 2013, maxYear: 2024 }, { name: "Q60", minYear: 2017, maxYear: 2024 }] },
    { name: "Acura", models: [{ name: "MDX", minYear: 2000, maxYear: 2024 }, { name: "RDX", minYear: 2006, maxYear: 2024 }, { name: "TLX", minYear: 2014, maxYear: 2024 }, { name: "ILX", minYear: 2012, maxYear: 2024 }, { name: "NSX", minYear: 1990, maxYear: 2022 }] },
    { name: "Buick", models: [{ name: "Enclave", minYear: 2007, maxYear: 2024 }, { name: "Encore", minYear: 2012, maxYear: 2024 }, { name: "Regal", minYear: 1973, maxYear: 2020 }, { name: "LaCrosse", minYear: 2004, maxYear: 2019 }, { name: "Verano", minYear: 2011, maxYear: 2017 }] },
    { name: "Ferrari", models: [{ name: "488", minYear: 2015, maxYear: 2020 }, { name: "F8 Tributo", minYear: 2019, maxYear: 2024 }, { name: "812 Superfast", minYear: 2017, maxYear: 2024 }, { name: "SF90", minYear: 2019, maxYear: 2024 }, { name: "Portofino", minYear: 2017, maxYear: 2024 }] },
    { name: "Lamborghini", models: [{ name: "Huracán", minYear: 2014, maxYear: 2024 }, { name: "Aventador", minYear: 2011, maxYear: 2024 }, { name: "Urus", minYear: 2018, maxYear: 2024 }, { name: "Gallardo", minYear: 2003, maxYear: 2013 }, { name: "Diablo", minYear: 1990, maxYear: 2001 }] },
    { name: "Maserati", models: [{ name: "Ghibli", minYear: 2013, maxYear: 2024 }, { name: "Levante", minYear: 2016, maxYear: 2024 }, { name: "Quattroporte", minYear: 1963, maxYear: 2024 }, { name: "GranTurismo", minYear: 2007, maxYear: 2019 }, { name: "MC20", minYear: 2020, maxYear: 2024 }] }
  ];
  
  