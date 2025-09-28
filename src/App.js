// import React, { useState, useEffect } from "react";
// import { Calculator } from "lucide-react";
// import "./App.css"; // <-- you’re already using App.css

// export default function PriceCalculator() {
//    const [rawData, setRawData] = useState(null);
//   const [priceData, setPriceData] = useState([]);
//   const [region, setRegion] = useState("");
//   const [country, setCountry] = useState("");
//   const [serviceLevel, setServiceLevel] = useState("");
//   const [durationType, setDurationType] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     fetch("/teceze_pricebook.json")
//       .then((res) => res.json())
//       .then((data) => {
//         setRawData(data);
//         setPriceData(transformData(data));
//       });
//   }, []);

//   const transformData = (data) => {
//     const result = [];
//     const levels = ["L1", "L2", "L3", "L4", "L5"];
//     data.forEach((row) => {
//       const region = row["Region"];
//       const country = row["Country"];

//       levels.forEach((level) => {
//         const durations = [
//           { key: `${level}`, type: "Full Day Visit" },
//           { key: `${level}.1`, type: "Half Day Visit" },
//           { key: `${level}.2`, type: "Short Term Project" },
//           { key: `${level}.3`, type: "Long Term Project" },
//           { key: `${level}.4`, type: "Monthly" },
//         ];

//         durations.forEach((d) => {
//           const priceStr = row[d.key];
//           if (priceStr && !isNaN(priceStr)) {
//             result.push({
//               region: region || "Unknown",
//               country: country || "Unknown",
//               serviceLevel: level,
//               durationType: d.type,
//               price: parseFloat(priceStr),
//             });
//           }
//         });
//       });
//     });
//     return result;
//   };

//   const regions = [...new Set(priceData.map((row) => row.region))];
//   const countries = [
//     ...new Set(priceData.filter((r) => r.region === region).map((row) => row.country)),
//   ];
//   const serviceLevels = [
//     ...new Set(priceData.filter((r) => r.country === country).map((row) => row.serviceLevel)),
//   ];
//   const durationTypes = [
//     ...new Set(priceData.filter((r) => r.serviceLevel === serviceLevel).map((row) => row.durationType)),
//   ];

//   const handleCalculate = () => {
//     const match = priceData.find(
//       (row) =>
//         row.region === region &&
//         row.country === country &&
//         row.serviceLevel === serviceLevel &&
//         row.durationType === durationType
//     );

//     if (match) {
//       const total = quantity * match.price;
//       setResult(`💰 Total Price: $${total.toFixed(2)}`);
//     } else {
//       setResult("❌ No matching data found");
//     }
//   };

//   return (
//     <div className="calculator-container">
//       <h1 className="calculator-title">
//         <Calculator size={26} /> Price Calculator
//       </h1>

//       <label className="label">🌍 Region</label>
//       <select
//         className="select"
//         value={region}
//         onChange={(e) => {
//           setRegion(e.target.value);
//           setCountry("");
//           setServiceLevel("");
//           setDurationType("");
//         }}
//       >
//         <option value="">-- Select Region --</option>
//         {regions.map((r, i) => (
//           <option key={i} value={r}>{r}</option>
//         ))}
//       </select>

//       <label className="label">📍 Country</label>
//       <select
//         className="select"
//         value={country}
//         onChange={(e) => {
//           setCountry(e.target.value);
//           setServiceLevel("");
//           setDurationType("");
//         }}
//       >
//         <option value="">-- Select Country --</option>
//         {countries.map((c, i) => (
//           <option key={i} value={c}>{c}</option>
//         ))}
//       </select>

//       <label className="label">⚡ Service Level</label>
//       <select
//         className="select"
//         value={serviceLevel}
//         onChange={(e) => {
//           setServiceLevel(e.target.value);
//           setDurationType("");
//         }}
//       >
//         <option value="">-- Select Service Level --</option>
//         {serviceLevels.map((s, i) => (
//           <option key={i} value={s}>{s}</option>
//         ))}
//       </select>

//       <label className="label">⏳ Duration Type</label>
//       <select
//         className="select"
//         value={durationType}
//         onChange={(e) => setDurationType(e.target.value)}
//       >
//         <option value="">-- Select Duration --</option>
//         {durationTypes.map((d, i) => (
//           <option key={i} value={d}>{d}</option>
//         ))}
//       </select>

//       <label className="label">#️⃣ Quantity</label>
//       <input
//         type="number"
//         className="input"
//         value={quantity}
//         onChange={(e) => setQuantity(Number(e.target.value))}
//         min={1}
//       />

//       <button className="button" onClick={handleCalculate}>
//         Calculate
//       </button>

//       {result && <div className="result">{result}</div>}
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { Calculator } from "lucide-react";
import "./App.css"; // <-- you’re already using App.css

export default function PriceCalculator() {
  const [priceData, setPriceData] = useState([]);
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [serviceLevel, setServiceLevel] = useState("");
  const [durationType, setDurationType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("/teceze_pricebook.json")
      .then((res) => res.json())
      .then((data) => {
        setPriceData(transformData(data));
      });
  }, []);

  const transformData = (data) => {
    const result = [];
    const levels = ["L1", "L2", "L3", "L4", "L5"];
    data.forEach((row) => {
      const region = row["Region"];
      const country = row["Country"];

      levels.forEach((level) => {
        const durations = [
          { key: `${level}`, type: "Full Day Visit" },
          { key: `${level}.1`, type: "Half Day Visit" },
          { key: `${level}.2`, type: "Short Term Project" },
          { key: `${level}.3`, type: "Long Term Project" },
          { key: `${level}.4`, type: "Monthly" },
        ];

        durations.forEach((d) => {
          const priceStr = row[d.key];
          if (priceStr && !isNaN(priceStr)) {
            result.push({
              region: region || "Unknown",
              country: country || "Unknown",
              serviceLevel: level,
              durationType: d.type,
              price: parseFloat(priceStr),
            });
          }
        });
      });
    });
    return result;
  };

  const regions = [...new Set(priceData.map((row) => row.region))];
  const countries = [
    ...new Set(priceData.filter((r) => r.region === region).map((row) => row.country)),
  ];
  const serviceLevels = [
    ...new Set(priceData.filter((r) => r.country === country).map((row) => row.serviceLevel)),
  ];
  const durationTypes = [
    ...new Set(priceData.filter((r) => r.serviceLevel === serviceLevel).map((row) => row.durationType)),
  ];

  const handleCalculate = () => {
    const match = priceData.find(
      (row) =>
        row.region === region &&
        row.country === country &&
        row.serviceLevel === serviceLevel &&
        row.durationType === durationType
    );

    if (match) {
      const total = quantity * match.price;
      setResult(`💰 Total Price: $${total.toFixed(2)}`);
    } else {
      setResult("❌ No matching data found");
    }
  };

  return (
    <div className="calculator-container">
      <h1 className="calculator-title">
        <Calculator size={26} /> Price Calculator
      </h1>

      <label className="label">🌍 Region</label>
      <select
        className="select"
        value={region}
        onChange={(e) => {
          setRegion(e.target.value);
          setCountry("");
          setServiceLevel("");
          setDurationType("");
        }}
      >
        <option value="">-- Select Region --</option>
        {regions.map((r, i) => (
          <option key={i} value={r}>{r}</option>
        ))}
      </select>

      <label className="label">📍 Country</label>
      <select
        className="select"
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
          setServiceLevel("");
          setDurationType("");
        }}
      >
        <option value="">-- Select Country --</option>
        {countries.map((c, i) => (
          <option key={i} value={c}>{c}</option>
        ))}
      </select>

      <label className="label">⚡ Service Level</label>
      <select
        className="select"
        value={serviceLevel}
        onChange={(e) => {
          setServiceLevel(e.target.value);
          setDurationType("");
        }}
      >
        <option value="">-- Select Service Level --</option>
        {serviceLevels.map((s, i) => (
          <option key={i} value={s}>{s}</option>
        ))}
      </select>

      <label className="label">⏳ Duration Type</label>
      <select
        className="select"
        value={durationType}
        onChange={(e) => setDurationType(e.target.value)}
      >
        <option value="">-- Select Duration --</option>
        {durationTypes.map((d, i) => (
          <option key={i} value={d}>{d}</option>
        ))}
      </select>

      <label className="label">#️⃣ Quantity</label>
      <input
        type="number"
        className="input"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min={1}
      />

      <button className="button" onClick={handleCalculate}>
        Calculate
      </button>

      {result && <div className="result">{result}</div>}
    </div>
  );
}
