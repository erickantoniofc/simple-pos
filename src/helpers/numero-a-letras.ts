export function numeroALetras(num: number): string {
  const unidades = (num: number): string => {
    return [
      '', 'Un', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis',
      'Siete', 'Ocho', 'Nueve'
    ][num] || '';
  };

  const decenas = (num: number): string => {
    const dec = Math.floor(num / 10);
    const uni = num % 10;

    switch (dec) {
      case 1:
        return [
          'Diez', 'Once', 'Doce', 'Trece', 'Catorce',
          'Quince', 'Dieciséis', 'Diecisiete', 'Dieciocho', 'Diecinueve'
        ][uni];
      case 2:
        return uni === 0 ? 'Veinte' : `Veinti${unidades(uni).toLowerCase()}`;
      case 3: return combine('Treinta', uni);
      case 4: return combine('Cuarenta', uni);
      case 5: return combine('Cincuenta', uni);
      case 6: return combine('Sesenta', uni);
      case 7: return combine('Setenta', uni);
      case 8: return combine('Ochenta', uni);
      case 9: return combine('Noventa', uni);
      default: return unidades(uni);
    }
  };

  const combine = (str: string, unidad: number) => unidad > 0
    ? `${str} y ${unidades(unidad)}`
    : str;

  const centenas = (num: number): string => {
    const cent = Math.floor(num / 100);
    const resto = num % 100;

    switch (cent) {
      case 1: return resto === 0 ? 'Cien' : `Ciento ${decenas(resto)}`;
      case 2: return `Doscientos ${decenas(resto)}`;
      case 3: return `Trescientos ${decenas(resto)}`;
      case 4: return `Cuatrocientos ${decenas(resto)}`;
      case 5: return `Quinientos ${decenas(resto)}`;
      case 6: return `Seiscientos ${decenas(resto)}`;
      case 7: return `Setecientos ${decenas(resto)}`;
      case 8: return `Ochocientos ${decenas(resto)}`;
      case 9: return `Novecientos ${decenas(resto)}`;
      default: return decenas(resto);
    }
  };

  const miles = (num: number): string => {
    const mil = Math.floor(num / 1000);
    const resto = num % 1000;
    let resultado = '';

    if (mil > 0) {
      resultado += mil === 1 ? 'Mil' : `${centenas(mil)} Mil`;
    }

    if (resto > 0) {
      resultado += ` ${centenas(resto)}`;
    }

    return resultado.trim();
  };

  const millones = (num: number): string => {
    const mill = Math.floor(num / 1_000_000);
    const resto = num % 1_000_000;
    let resultado = '';

    if (mill > 0) {
      resultado += mill === 1 ? 'Un Millón' : `${centenas(mill)} Millones`;
    }

    if (resto > 0) {
      resultado += ` ${miles(resto)}`;
    }

    return resultado.trim();
  };

  const enteros = Math.floor(num);
  const centavos = Math.round((num - enteros) * 100);

  const letras = millones(enteros);
  const centavosStr = centavos.toString().padStart(2, '0');

  return `${letras} Dólares con ${centavosStr}/100`.toUpperCase();
}
