const puppeteer = require('puppeteer');
const jsdom = require('jsdom');

(async () => {
  try {
    // Abrimos una instancia del puppeteer y accedemos a la url de google
    const browser = await puppeteer.launch() ;
    const page = await browser.newPage();
    const response = await page.goto('https://subastas.boe.es/subastas_ava.php?campo%5B2%5D=SUBASTA.ESTADO&dato%5B2%5D=EJ&campo%5B3%5D=BIEN.TIPO&dato%5B3%5D=I&campo%5B8%5D=BIEN.COD_PROVINCIA&dato%5B8%5D=28&campo%5B17%5D=SUBASTA.FECHA_INICIO_YMD&dato%5B17%5D%5B0%5D=&dato%5B17%5D%5B1%5D=&page_hits=40&sort_field%5B0%5D=SUBASTA.FECHA_FIN_YMD&sort_order%5B0%5D=desc&sort_field%5B1%5D=SUBASTA.FECHA_FIN_YMD&sort_order%5B1%5D=asc&sort_field%5B2%5D=SUBASTA.HORA_FIN&sort_order%5B2%5D=asc&accion=Buscar');
    const body = await response.text();

    // Creamos una instancia del resultado devuelto por puppeter para parsearlo con jsdom
    const { window: { document } } = new jsdom.JSDOM(body);

    // Seleccionamos los títulos y lo mostramos en consola
    document.querySelectorAll('.resultado-busqueda')
      .forEach(element => console.log(element.textContent));

    // Cerramos el puppeteer
    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();