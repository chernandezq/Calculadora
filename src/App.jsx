import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const App = () => {
  const date = new Date();
  const semestralChoice = true;
  const christmas = 260000;
  const maximumSalaryForLunchBenefit = 4270500;
  const lunchBenefitValue = 203418;
  const transportationBenefitValue = 200000;
  const utilityValue = 0;

  const { register, watch } = useForm();

  // Función para formatear valores a moneda colombiana (para display)
  const formatCurrency = (value) => {
    if (value === 0 || value === null || value === undefined) return "$0";
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numValue)) return "$0";
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numValue);
  };

  const formatCurrencyInput = (value) => {
    if (!value || value === 0) return "";
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numValue)) return "";
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numValue);
  };

  const parseCurrencyInput = (value) => {
    if (!value) return 0;

    const cleaned = value.toString().replace(/\./g, "").replace(/\s/g, "");
    const numValue = parseFloat(cleaned);
    return isNaN(numValue) ? 0 : numValue;
  };

  const [salaryBase, setSalaryBase] = useState(0);
  const [sumPayForExtraHours, setSumPayForExtraHours] = useState(0);
  const [payForBonusRecess, setPayForBonusRecess] = useState(0);

  // Estados para valores formateados de los inputs
  const [salaryBaseFormatted, setSalaryBaseFormatted] = useState("");
  const [sumPayForExtraHoursFormatted, setSumPayForExtraHoursFormatted] =
    useState("");
  const [payForBonusRecessFormatted, setPayForBonusRecessFormatted] =
    useState("");

  const [lunchAllowance, setLunchAllowance] = useState(0);
  const [transAllowance, setTransAllowance] = useState(0);
  const [extraHoursForSem, setExtraHoursForSem] = useState(0);
  const [recessBonusPayForSem, setRecessBonusPayForSem] = useState(0);

  const [totalSemestralBonus, setTotalSemestralBonus] = useState(0);
  const [totalServicesBonus, setTotalServicesBonus] = useState(0);
  const [totalValueForBonusConcept, setTotalValueForBonusConcept] = useState(0);

  const [christmasBonus, setChristmasBonus] = useState(0);
  const [profitSharing, setProfitSharing] = useState(0);

  const salary = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "") {
      setSalaryBase(0);
      setSalaryBaseFormatted("");
      return;
    }
    const numericValue = parseCurrencyInput(inputValue);
    setSalaryBase(numericValue);
    setSalaryBaseFormatted(formatCurrencyInput(numericValue));
  };

  const extraHours = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "") {
      setSumPayForExtraHours(0);
      setSumPayForExtraHoursFormatted("");
      return;
    }
    const numericValue = parseCurrencyInput(inputValue);
    setSumPayForExtraHours(numericValue);
    setSumPayForExtraHoursFormatted(formatCurrencyInput(numericValue));
  };

  const payForBonus = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "") {
      setPayForBonusRecess(0);
      setPayForBonusRecessFormatted("");
      return;
    }
    const numericValue = parseCurrencyInput(inputValue);
    setPayForBonusRecess(numericValue);
    setPayForBonusRecessFormatted(formatCurrencyInput(numericValue));
  };

  //Second semestre: true - First semestre: false.
  useEffect(() => {
    salaryBase > 0
      ? setLunchAllowance(lunchBenefitValue)
      : setLunchAllowance(0);

    salaryBase <= maximumSalaryForLunchBenefit && salaryBase > 0
      ? setTransAllowance(transportationBenefitValue)
      : setTransAllowance(0);
  }, [salaryBase]);
  //______________________________________________

  useEffect(() => {
    sumPayForExtraHours > 0
      ? setExtraHoursForSem(parseInt(parseInt(sumPayForExtraHours) / 6))
      : setExtraHoursForSem(0);
  }, [sumPayForExtraHours]);

  useEffect(() => {
    payForBonusRecess > 0
      ? setRecessBonusPayForSem(parseInt(parseInt(payForBonusRecess) / 6))
      : setRecessBonusPayForSem(0);
  }, [payForBonusRecess]);

  useEffect(() => {
    totalSemestralBonus > 0
      ? setTotalServicesBonus(
          parseInt(parseInt(totalSemestralBonus) * 0.583333)
        )
      : setTotalServicesBonus(0);
  }, [totalSemestralBonus]);

  //_______________________________________________

  useEffect(() => {
    semestralChoice === true
      ? setChristmasBonus(parseInt(salaryBase * 0.6))
      : setChristmasBonus(0);
  }, [semestralChoice, christmas, salaryBase]);

  useEffect(() => {
    christmasBonus === 0 && semestralChoice
      ? setProfitSharing(298106)
      : setProfitSharing(0);
  }, [christmasBonus]);
  //________________________________________________

  useEffect(() => {
    salaryBase > 0
      ? setTotalSemestralBonus(
          parseInt(
            lunchAllowance +
              transAllowance +
              extraHoursForSem +
              recessBonusPayForSem +
              parseInt(christmasBonus) / 6
          ) +
            parseInt(salaryBase) +
            (parseInt(profitSharing) + parseInt(utilityValue / 6))
        )
      : setTotalSemestralBonus(0);

    salaryBase > 0
      ? setTotalValueForBonusConcept(
          parseInt(totalServicesBonus + christmasBonus) +
            parseInt(totalSemestralBonus)
        )
      : setTotalValueForBonusConcept(0);
  }, [
    semestralChoice,
    lunchAllowance,
    transAllowance,
    extraHoursForSem,
    recessBonusPayForSem,
    christmasBonus,
    salaryBase,
    profitSharing,
    christmas,
    totalServicesBonus,
    totalSemestralBonus,
  ]);
  //___________________________________________________

  //Verification (React Hook Form)
  const firstBox = watch("firstBox");
  const secondBox = watch("secondBox");
  const thirdBox = watch("thirdBox");

  return (
    <div className="container mx-auto w-3/5 border mb-5 rounded">
      <h1 className="text-2xl p-5 text-center border text-gray-900 bg-gray-200 font-bold">
        CALCULO PRIMAS SEMESTRALES{" "}
        {!semestralChoice ? "PRIMER SEMESTRE" : "SEGUNDO SEMESTRE"}{" "}
        {date.getFullYear()}
      </h1>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 text-center p-5">
          <label
            className="text-lg font-bold pt-5 m-2 text-center text-gray-600"
            htmlFor="firstBox"
          >
            Sueldo básico a {!semestralChoice ? "Mayo 31" : "Noviembre 30"} (*)
          </label>
          <br></br>
          <input
            {...register("firstBox")}
            onChange={salary}
            value={salaryBaseFormatted}
            className="border shadow m-2 w-full rounded leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="0"
            name="firstBox"
            inputMode="numeric"
          />
          <p className="text-red-500 text-xs italic">
            {firstBox === false ? "Ingrese un valor numerico" : ""}
          </p>
          <br></br>

          <h1 className="font-bold text-2xl pt-5 text-gray-600">
            VALORES PROPORCIONALES
          </h1>
          <br></br>

          <label
            className="text-lg font-bold pt-5 m-2 text-center text-gray-600"
            htmlFor="secondBox"
          >
            Suma de lo pagado por horas extras en el semestre
          </label>
          <br></br>
          <input
            {...register("secondBox")}
            onChange={extraHours}
            value={sumPayForExtraHoursFormatted}
            className="shadow border m-2 w-full rounded leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="0"
            inputMode="numeric"
          />
          <p className="text-red-500 text-xs italic">
            {secondBox === false ? "Ingrese un valor numerico" : ""}
          </p>
          <br></br>
          <br></br>

          <label
            className="text-lg font-bold pt-5 m-2 text-center text-gray-600"
            htmlFor="thirdBox"
          >
            Valor pagado por prima de vacaciones en el semestre
            <br />
            {!semestralChoice
              ? "(ENERO 1 A JUNIO 30)"
              : "(JULIO 1 A DICIEMBRE 31)"}
          </label>
          <br></br>
          <input
            {...register("thirdBox")}
            onChange={payForBonus}
            value={payForBonusRecessFormatted}
            className="shadow border m-2 w-full rounded leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="0"
            inputMode="numeric"
          />
          <p className="text-red-500 text-xs italic">
            {thirdBox === false ? "Ingrese un valor numerico" : ""}
          </p>
        </div>
        <div className="w-full sm:w-1/2 pb-5 px-3">
          <h1 className="text-lg font-bold pt-2 m-2 text-center text-gray-600">
            Subsidio de almuerzo con efecto prestacional
          </h1>
          <h1 className="text-2xl font-bold text-center">
            {formatCurrency(lunchAllowance)}
          </h1>

          <h1 className="text-lg font-bold pt-5 m-2 text-center text-gray-600">
            Subsidio de transporte
          </h1>
          <h1 className="text-2xl font-bold text-center">
            {formatCurrency(transAllowance)}
          </h1>

          <h1 className="text-lg font-bold pt-5 m-2 text-center text-gray-600">
            Horas extras en el semestre
          </h1>
          <h1 className="text-2xl font-bold text-center">
            {formatCurrency(extraHoursForSem)}
          </h1>

          {!semestralChoice && (
            <>
              <h1 className="text-lg font-bold pt-5 m-2 text-center text-gray-600">
                VALOR PAGADO POR PARTICIPACION DE UTILIDADES
              </h1>
              <h1 className="text-2xl font-bold text-center">
                {formatCurrency(
                  totalValueForBonusConcept > 0 ? parseInt(utilityValue / 6) : 0
                )}
              </h1>
            </>
          )}

          <h1 className="text-lg font-bold pt-5 m-2 text-center text-gray-600">
            Prima de vacaciones pagadas en el semestre
          </h1>
          <h1 className="text-2xl font-bold text-center">
            {formatCurrency(recessBonusPayForSem)}
          </h1>

          <h1 className="text-lg font-bold pt-5 m-2 text-center text-gray-600">
            TOTAL PRIMA SEMESTRAL
          </h1>
          <h1 className="text-2xl font-bold text-center">
            {formatCurrency(totalSemestralBonus)}
          </h1>

          <h1 className="text-lg font-bold pt-5 m-2 text-center text-gray-600">
            TOTAL PRIMA SERVICIOS
          </h1>
          <h1 className="text-2xl font-bold text-center">
            {formatCurrency(totalServicesBonus)}
          </h1>

          {semestralChoice && (
            <>
              <h1 className="text-lg font-bold pt-5 m-2 text-center text-gray-600">
                BONIFICACION DE NAVIDAD
              </h1>
              <h1 className="text-2xl font-bold text-center">
                {formatCurrency(christmasBonus)}
              </h1>
            </>
          )}

          <h1 className="text-lg font-bold pt-5 m-2 text-center text-gray-600">
            VALOR TOTAL POR CONCEPTO DE PRIMAS
          </h1>
          <h1 className="text-2xl font-bold text-center">
            {formatCurrency(totalValueForBonusConcept)}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default App;
