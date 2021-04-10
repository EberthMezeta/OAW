-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-04-2021 a las 02:51:30
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `feedrss`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

CREATE TABLE `noticias` (
  `idnews` int(11) NOT NULL,
  `idRSS` int(11) NOT NULL,
  `fecha` varchar(100) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `enlace` varchar(400) NOT NULL,
  `descripcion` varchar(400) DEFAULT NULL,
  `cat` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `noticias`
--

INSERT INTO `noticias` (`idnews`, `idRSS`, `fecha`, `titulo`, `enlace`, `descripcion`, `cat`) VALUES
(896, 45, 'Wed, 17 Jul 2019 04:16:33 GMT', 'Un nuevo \'micro sismo\' sacude algunas zonas de la Ciudad de México', 'https://expansion.mx/nacional/2019/07/16/un-nuevo-sismo-sacude-durante-segundos-algunas-zonas-de-la-ciudad-de-mexico', 'Un sismo sacudió en la noche de este martes algunas zonas de la Ciudad de México durante breves segundos. Fue de magnitud 2.9, con el epicentro localizado en la alcaldía Álvaro Obregón.', 'Nacional'),
(897, 45, 'Fri, 15 Mar 2019 01:47:46 GMT', 'Aleatica se desmarca de la ‘campaña negra’ contra AMLO', 'https://expansion.mx/nacional/2019/03/14/aleatica-se-desmarca-de-la-campana-negra-contra-amlo', 'Bufete brindó servicios de consultoría para proteger la reputación y posición de la Compañía, mejorar su servicio al cliente, y fortalecer su posicionamiento público, precisó Aleatica.', 'Nacional'),
(898, 45, 'Thu, 14 Mar 2019 20:55:16 GMT', 'El Partido Republicano pide a AMLO reforzar lucha contra narcotráfico', 'https://expansion.mx/nacional/2019/03/14/el-partido-republicano-pide-a-amlo-reforzar-lucha-contra-narcotrafico', 'Hay temas que aquejan la relación bilateral entre ambos países, sostiene Larry Rubin, representante en México del Partido Republicano de EU', 'Nacional'),
(899, 45, 'Wed, 13 Mar 2019 21:00:29 GMT', 'El gobierno de AMLO quiere blindar la compra de medicinas con estas medidas', 'https://expansion.mx/nacional/2019/03/13/el-gobierno-de-amlo-quiere-blindar-la-compra-de-medicinas-con-estas-medidas', 'La administración federal recurrirá a la adjudicación directa del 16 de abril al 30 de junio, y a la licitación internacional durante el segundo semestre de 2019.', 'Nacional'),
(900, 45, 'Wed, 13 Mar 2019 00:36:56 GMT', 'El gobierno de AMLO ‘balconea’ a los preferidos de EPN para comprar medicinas', 'https://expansion.mx/nacional/2019/03/12/el-gobierno-de-amlo-balconea-a-los-preferidos-de-epn-para-comprar-medicinas', 'La administración de Enrique Peña Nieto tuvo como su principal proveedor a Grupo Fármacos Especializados, de acuerdo con un informe publicado por Hacienda.', 'Nacional'),
(901, 45, 'Tue, 12 Mar 2019 19:56:16 GMT', 'El incendio en la Torre Titanium es causado por un corto circuito', 'https://expansion.mx/nacional/2019/03/12/el-incendio-en-la-torre-titanium-es-causado-por-un-corto-circuito', 'El incendio en el cuarto de aire acondicionado del inmueble ubicado en San Andrés Cholula ya fue controlado, de acuerdo con Protección Civil de Puebla.', 'Nacional'),
(902, 45, 'Mon, 11 Mar 2019 18:34:54 GMT', '10 frases de AMLO durante su informe de los primeros 100 días de gobierno', 'https://expansion.mx/nacional/2019/03/11/10-frases-de-amlo-durante-su-informe-de-los-primeros-100-dias-de-gobierno', 'El presidente asegura que no hay señales de recesión económica y defiende su meta de que la economía crecerá 4% anual en promedio.', 'Nacional'),
(903, 45, 'Sat, 09 Mar 2019 00:32:07 GMT', 'El gobierno de AMLO le receta austeridad a sindicato de ferrocarrileros', 'https://expansion.mx/nacional/2019/03/08/el-gobierno-receta-austeridad-a-sindicato-de-ferrocarrileros', 'La administración y el gremio acuerdan reducir los gastos de administración otorgados desde 2002 como parte del proceso de liquidación de Ferronales; se pretenden ahorros por 18 mdp anuales.', 'Nacional'),
(904, 45, 'Fri, 08 Mar 2019 22:20:51 GMT', '23 inmigrantes guatemaltecos mueren en un accidente vial en Chiapas', 'https://expansion.mx/nacional/2019/03/08/23-inmigrantes-guatemaltecos-mueren-en-un-accidente-vial-en-chiapas', 'Entre los fallecidos hay dos menores de 2 y 7 años; además, 33 personas más resultaron heridas.', 'Nacional'),
(905, 45, 'Fri, 08 Mar 2019 04:07:32 GMT', 'La Función Pública investiga los casos Pegasus y la estafa maestra', 'https://expansion.mx/nacional/2019/03/07/la-funcion-publica-investiga-lcasos-pegasus-y-estafa-maestra', 'La titular de la Función Pública informó que se trabaja con todo el gobierno para dar continuidad a las investigaciones por el uso y contratación de Pegasus y el caso de la llamada estafa maestra.', 'Nacional'),
(906, 45, 'Fri, 08 Mar 2019 02:25:08 GMT', 'Alfonso Romo da esperanzas a las rondas petroleras', 'https://expansion.mx/nacional/2019/03/07/alfonso-romo-da-esperanzas-a-las-rondas-petroleras', 'El jefe de la oficina de Presidencia dice que las rondas petroleras podrían reactivarse si las empresas que resultaron ganadoras cumplen con la inversión, producción y beneficios para el gobierno.', 'Nacional'),
(907, 45, 'Thu, 07 Mar 2019 18:35:55 GMT', 'El Cártel de Santa Rosa de Lima desafía el temple de AMLO', 'https://expansion.mx/nacional/2019/03/07/el-cartel-de-santa-rosa-de-lima-desafia-el-temple-de-amlo', 'Está a prueba la capacidad del gobierno mexicano para controlar los territorios controlados por los huachicoleros.', 'Nacional'),
(908, 45, 'Thu, 07 Mar 2019 15:26:47 GMT', 'El morenista Salomón Jara se rebela y promete iniciativa contra calificadoras', 'https://expansion.mx/nacional/2019/03/07/ricardo-monreal-niega-iniciativa-de-ley-para-revocar-permiso-a-calificadoras', 'El senador de Morena asegura a la agencia Reuters que pese al rechazo de AMLO y de Ricardo Monreal, presentará \"quizá el martes\" su iniciativa de reforma a la Ley de Valores.', 'Nacional'),
(909, 45, 'Thu, 07 Mar 2019 11:00:49 GMT', 'Esta organización quiere que te comprometas a no dar mordidas', 'https://expansion.mx/nacional/2019/03/07/esta-organizacion-quiere-que-te-comprometas-a-no-dar-mordidas', 'MéXXico pretende sumar a un millón de personas que hagan público el propósito de no participar en actos de corrupción.', 'Nacional'),
(910, 45, 'Thu, 07 Mar 2019 00:27:35 GMT', 'Las calificadoras quieren ver a México como un país bananero, dice Padierna', 'https://expansion.mx/nacional/2019/03/06/las-calificadoras-quieren-ver-a-mexico-como-un-pais-bananero-dice-padierna', 'La morenista y vicepresidenta de la Cámara de Diputados afirma que las agencias de riesgos cuidan los intereses de los dueños del capital.', 'Nacional'),
(911, 45, 'Wed, 06 Mar 2019 22:50:42 GMT', 'Italia devuelve a México cerca de 600 pinturas exvoto sustraídas ilegalmente', 'https://expansion.mx/nacional/2019/03/06/italia-devuelve-a-mexico-cerca-de-600-pinturas-exvoto-sustraidas-ilegalmente', 'La recuperación se dio tras una investigación dirigida a combatir el tráfico ilícito internacional de patrimonio cultural; las pinturas fueron sacadas entre 1960 y 1970 de varios lugares en México.', 'Nacional'),
(912, 45, 'Wed, 06 Mar 2019 22:03:11 GMT', 'Morena buscará cambiar ley para sancionar a las calificadoras de riesgo', 'https://expansion.mx/nacional/2019/03/06/morena-cambiara-ley-para-sancionar-a-calificadoras-de-riesgo', 'El senador Salomón Jara dijo que presentarán una iniciativa para modificar la Ley del Mercado de Valores, a fin de sancionar a las calificadoras que actúen sin transparencia ni objetividad.', 'Nacional'),
(913, 45, 'Tue, 05 Mar 2019 00:15:03 GMT', 'El sector empresarial propone una nueva visión para México, basada en valores', 'https://expansion.mx/nacional/2019/03/04/el-sector-empresarial-propone-una-nueva-vision-para-mexico-basada-en-valores', 'El presidente del Consejo Coordinador Empresarial dice que la denominada Visión México 2030 implica “un cambio de paradigma bajo el cual todos ponen, para que todos ganen”.', 'Nacional'),
(914, 45, 'Mon, 04 Mar 2019 23:29:57 GMT', 'Hacienda investiga 50 presuntos casos de corrupción en el sector salud', 'https://expansion.mx/nacional/2019/03/04/hacienda-investiga-50-presuntos-casos-de-corrupcion-en-el-sector-salud', 'La instrucción es presentar todas las denuncias, involucren a quien involucren, dice el titular de la Unidad de Inteligencia Financiera, Santiago Nieto.', 'Nacional'),
(915, 45, 'Mon, 04 Mar 2019 20:21:20 GMT', 'La Agencia Digital de la CDMX crea laboratorio de seguridad y justicia', 'https://expansion.mx/nacional/2019/03/04/la-agencia-digital-de-la-cdmx-crea-laboratorio-de-seguridad-y-justicia', 'En México 3 de cada 100 jóvenes es vulnerable a homicidios por ello el surgimiento de este laboratorio', 'Nacional'),
(916, 45, 'Sat, 02 Mar 2019 22:04:59 GMT', 'Mujeres reclaman a AMLO por falta de claridad sobre los refugios para víctimas', 'https://expansion.mx/nacional/2019/03/02/mujeres-reclaman-a-amlo-por-falta-de-claridad-sobre-los-refugios-para-victimas', 'Activistas y organizaciones señalan que hay un \"caos\" con la información sobre qué pasará con estos lugares y sus recursos. Insisten en que dar apoyos directos no solucionará la violencia de género.', 'Nacional'),
(917, 45, 'Sat, 02 Mar 2019 01:47:38 GMT', 'La refinería de Dos Bocas está en marcha y avanza en tiempo y forma, dice Nahle', 'https://expansion.mx/nacional/2019/03/01/la-refineria-de-dos-bocas-esta-en-marcha-y-avanza-en-tiempo-y-forma-dice-nahle', 'La secretaria de Energía asegura que se dará a conocer lo relacionado con el proyecto, cuyos estudios de impacto ambiental y todo lo correspondiente está bajo responsabilidad de Pemex.', 'Nacional'),
(918, 45, 'Sat, 02 Mar 2019 01:11:04 GMT', 'La Policía Federal detiene a cuatro miembros de la Unión Tepito', 'https://expansion.mx/nacional/2019/03/01/la-policia-federal-detiene-a-cuatro-miembros-de-la-union-tepito', 'Los detenidos fueron puestos a disposición de la Subprocuraduría Especializada en Investigación y Delincuencia Organizada.', 'Nacional'),
(919, 45, 'Fri, 01 Mar 2019 21:35:09 GMT', 'Nuevas colecciones y más librerías: los planes para el FCE de Taibo II', 'https://expansion.mx/nacional/2019/03/01/nuevas-colecciones-y-mas-librerias-los-planes-para-el-fce-de-taibo-ii', 'El también escritor promete reducir 50% el precio de los títulos que se lancen al mercado bajo el esquema de coedición.', 'Nacional'),
(920, 45, 'Fri, 01 Mar 2019 19:14:12 GMT', 'La Universidad Autónoma de Hidalgo es investigada por lavado de dinero', 'https://expansion.mx/nacional/2019/03/01/hacienda-confirma-que-universidad-autonoma-de-hidalgo-es-investigada-por-lavado', 'La institución recibió 150 mdd provenientes de Suiza, por lo que es investigada por la Unidad de Inteligencia Financiera de Hacienda; el rector dice que no hay irregularidades.', 'Nacional'),
(921, 45, 'Fri, 01 Mar 2019 04:12:11 GMT', 'Sánchez Cordero dice que hay organizaciones detrás de las caravanas migrantes', 'https://expansion.mx/nacional/2019/02/28/sanchez-cordero-dice-que-hay-organizaciones-detras-de-las-caravanas-migrantes', 'La secretaría de Gobernación señala que si no se cambia la situación de los países del Triángulo Norte de Centroamérica migrarán hasta 700,000 personas cada año.', 'Nacional'),
(922, 45, 'Fri, 01 Mar 2019 02:08:19 GMT', 'Adiós a los \'lujos\' como el Cirque du Soleil, dice Sectur', 'https://expansion.mx/nacional/2019/02/28/adios-a-los-lujos-como-el-cirque-du-soleil-dice-sectur', 'El secretario de Turismo, Miguel Torruco, criticó que se gasten millones en eventos de promoción turística que no representan a México.', 'Nacional'),
(923, 45, 'Fri, 01 Mar 2019 00:51:01 GMT', 'La secretaria del Trabajo pide disculpas por circular en sentido contrario', 'https://expansion.mx/nacional/2019/02/28/la-secretaria-del-trabajo-pide-disculpas-por-circular-en-sentido-contrario', 'María Luisa Alcalde dice que pedirá que se aplique la multa correspondiente, luego de ser captada al subir en una moto que circuló en sentido contrario en el Zócalo capitalino.', 'Nacional'),
(924, 45, 'Thu, 28 Feb 2019 22:25:16 GMT', 'Los diputados aprueban la Guardia Nacional y la mandan a los estados', 'https://expansion.mx/nacional/2019/02/28/los-diputados-aprueban-la-guardia-nacional-y-la-mandan-a-los-estados', 'Así como ocurrió en el Senado, en San Lázaro las bancadas llegaron a un acuerdo para avalar el tema casi por unanimidad. Ahora, los Congresos estatales deben dar su visto bueno.', 'Nacional'),
(925, 45, 'Thu, 28 Feb 2019 20:06:58 GMT', 'México desciende dos lugares en índice global de Estado de Derecho', 'https://expansion.mx/nacional/2019/02/28/mexico-desciende-dos-lugares-en-indice-global-de-estado-de-derecho', 'El país se ubica en la posición 99 de 126 naciones evaluadas para la edición 2019 del índice elaborado por la organización World Justice Project.', 'Nacional'),
(926, 45, 'Thu, 28 Feb 2019 02:31:21 GMT', 'La propuesta para flexibilizar las Afores avanza en la Cámara de Diputados', 'https://expansion.mx/nacional/2019/02/27/la-propuesta-para-flexibilizar-las-afores-avanza-en-la-camara-de-diputados', 'La Comisión de Hacienda aprobó una propuesta de Morena, que busca dar mayor flexibilidad para invertir a los fondos de pensiones.', 'Nacional'),
(927, 45, 'Wed, 27 Feb 2019 22:48:21 GMT', 'La CDMX busca recursos para mantener la F1 en México en 2020', 'https://expansion.mx/nacional/2019/02/27/la-cdmx-busca-recursos-para-mantener-la-f1-en-mexico-en-2020', 'Sheinbaum dice que buscarán recursos externos para cubrir los 400 mdp que se requieren para la continuación del Gran Premio de México en 2020.', 'Nacional'),
(928, 45, 'Wed, 27 Feb 2019 22:04:19 GMT', 'Los autos 2006 y posteriores ya podrán obtener calcomanía cero en la CDMX', 'https://expansion.mx/nacional/2019/02/27/los-autos-2006-y-posteriores-ya-podran-obtener-calcomania-cero-en-la-cdmx', 'Sheinbaum dice que de acuerdo con la norma vigente, los autos que cumplan con el funcionamiento del sistema de diagnóstico a bordo OBD podrían obtener calcomanía cero tras su proceso de verificación.', 'Nacional'),
(929, 45, 'Wed, 27 Feb 2019 03:39:46 GMT', 'Comisión del Senado aprueba dictamen de idoneidad para 11 candidatos a la CRE', 'https://expansion.mx/nacional/2019/02/26/comision-del-senado-aprueba-dictamen-de-idoneidad-para-11-candidatos-a-la-cre', 'De los 12 candidatos que envió el presidente López Obrador, la comisión solo no consideró idóneo a Raúl Morales Mitre, por no asistir a la comparecencia del pasado 14 de febrero.', 'Nacional'),
(930, 45, 'Wed, 27 Feb 2019 00:39:22 GMT', 'El gobierno de AMLO elimina premio cultural instituido en la gestión de EPN', 'https://expansion.mx/nacional/2019/02/26/el-gobierno-de-amlo-elimina-premio-cultural-instituido-en-la-gestion-de-epn', 'La Secretaría de Cultura ya no otorgará el Premio Luz de Plata, el cual se estableció apenas en 2018.', 'Nacional'),
(931, 45, 'Tue, 26 Feb 2019 22:05:29 GMT', 'AMLO garantiza a presidente de regulador investigación sin persecución política', 'https://expansion.mx/nacional/2019/02/26/amlo-garantiza-a-garcia-alcocer-investigacion-sin-persecucion-politica', 'López Obrador dice al presidente de la Comisión Reguladora de Energía, Guillermo García Alcocer, que no hay intención de perseguirlo políticamente porque esa no es su forma de actuar.', 'Nacional'),
(932, 45, 'Tue, 26 Feb 2019 21:46:43 GMT', 'Hacienda bloquea cuentas bancarias de universidad por posible lavado de dinero', 'https://expansion.mx/nacional/2019/02/26/hacienda-bloquea-cuentas-bancarias-de-universidad-por-posible-lavado-de-dinero', 'La Unidad de Inteligencia Financiera recibió un reporte en el que se alertó de movimientos financieros inusuales en cuentas bancarias a nombre de una universidad estatal, de la que omitió el nombre.', 'Nacional'),
(933, 45, 'Tue, 26 Feb 2019 20:04:12 GMT', 'La embajada de EU en México lanza alerta... por \'coyotes\'', 'https://expansion.mx/nacional/2019/02/26/la-embajada-de-eu-en-mexico-advierte-por-estafadores-afuera-de-sus-instalaciones', 'La representación diplomática alertó que personas tratan de hacerse pasar por sus empleados y buscan estafar a solicitantes de visa.', 'Nacional'),
(934, 45, 'Tue, 26 Feb 2019 17:41:17 GMT', 'Otro integrante de la Comisión Nacional de Hidrocarburos renuncia', 'https://expansion.mx/nacional/2019/02/26/renuncia-otro-comisionado-de-la-cnh', 'Gaspar Franco deja al regulador por motivos personales; es el tercer comisionado en renunciar a su puesto.', 'Nacional'),
(935, 45, 'Tue, 26 Feb 2019 01:55:17 GMT', 'El sector patronal en México defiende el trabajo de las organizaciones civiles', 'https://expansion.mx/nacional/2019/02/25/el-sector-patronal-en-mexico-defiende-el-trabajo-de-las-organizaciones-civiles', 'Con la participación de instituciones autónomas y organismos de la sociedad civil se propicia una efectiva relación de pesos y contrapesos en el ejercicio del poder, dice el presidente de la Coparmex.', 'Nacional'),
(936, 45, 'Mon, 25 Feb 2019 18:21:27 GMT', 'AMLO dice que en 15 días espera tener licitaciones de Tren Maya y red troncal', 'https://expansion.mx/nacional/2019/02/25/amlo-dice-que-en-15-dias-espera-tener-licitaciones-de-tren-maya-y-red-troncal', 'El presidente López Obrador destacó que la construcción del tren maya contará con financiamiento público y privado.', 'Nacional'),
(937, 45, 'Sat, 23 Feb 2019 00:16:03 GMT', '¿Petates comprados a empresa fantasma? La Cineteca dice que no', 'https://expansion.mx/nacional/2019/02/22/petates-usados-en-proyeccion-de-roma-en-los-pinos-comprados-a-empresa-fantasma', 'La compra de 2,000 petates de palma para la exhibición de cine al aire libre se hizo a Estrategy & Solutions; el diario \'El Universal\' reportó previamente que su dirección no existía.', 'Nacional'),
(938, 45, 'Sat, 23 Feb 2019 00:06:48 GMT', 'AMLO intercede para que familia del \'Chapo\' tramite visa humanitaria de EU', 'https://expansion.mx/nacional/2019/02/22/amlo-intercede-para-que-familia-del-chapo-tramite-visa-humanitaria-de-eu', 'Di instrucciones de que se procediera para que la madre y hermanas de Guzmán Loera puedan ir a Estados Unidos a visitar al exlíder del cártel de Sinaloa, informó el presidente mexicano.', 'Nacional'),
(939, 45, 'Fri, 22 Feb 2019 20:45:54 GMT', 'IMSS iniciará en abril prueba piloto para afiliación de trabajadoras domésticas', 'https://expansion.mx/nacional/2019/02/22/imss-iniciara-en-abril-prueba-piloto-para-afiliacion-de-trabajadoras-domesticas', 'La forma de afiliarse será tipo prepago, mediante una línea de captura que emitirá el instituto para que los patrones paguen en el banco vía ventanilla o vía electrónica.', 'Nacional'),
(940, 45, 'Fri, 22 Feb 2019 20:33:24 GMT', 'La defensa del ‘Chapo’ planea pedir un nuevo juicio en EU', 'https://expansion.mx/nacional/2019/02/22/la-defensa-del-chapo-planea-pedir-un-nuevo-juicio-en-eu', 'Joaquín Guzmán planea presentar una moción para un nuevo juicio basado en las revelaciones de Vice News, según el abogado Eduardo Balarezo.', 'Nacional'),
(941, 45, 'Fri, 22 Feb 2019 18:45:17 GMT', 'Jesús Torres es separado del SAT tras polémica por su desempeño en Coahuila', 'https://expansion.mx/nacional/2019/02/22/jesus-torres-es-separado-del-sat-tras-polemica-por-su-desempeno-en-coahuila', 'El anuncio de organismo se da en medio de los señalamientos de que Torres Charles dejó sin investigar casos cuando fue procurador de Justicia de Coahuila en la administración de Humberto Moreira.', 'Nacional'),
(942, 45, 'Fri, 22 Feb 2019 14:49:33 GMT', 'AMLO destaca facultad para nombrar a jefe de la Guardia Nacional', 'https://expansion.mx/nacional/2019/02/22/amlo-destaca-facultad-para-nombrar-a-jefe-de-la-guardia-nacional', 'El presidente dijo que será su facultad nombrar al titular de esta corporación, y que podría ser un civil o un militar en activo o retirado.', 'Nacional'),
(943, 45, 'Fri, 22 Feb 2019 02:43:54 GMT', 'INAI rechaza que versión pública de caso Odebrecht viole presunción de inocencia', 'https://expansion.mx/nacional/2019/02/21/inai-rechaza-que-version-publica-de-caso-odebrecht-viole-presuncion-de-inocencia', 'El dar acceso en versión pública a la carpeta de investigación, como lo ha resuelto el instituto, no pone en riesgo la presunción de inocencia de los involucrados, dice el comisionado Oscar Guerra.', 'Nacional'),
(944, 45, 'Fri, 22 Feb 2019 01:46:59 GMT', 'EU, ahora tras dos hijos del ‘Chapo’', 'https://expansion.mx/nacional/2019/02/21/eu-ahora-tras-dos-hijos-del-chapo', 'Joaquín y Ovidio Guzmán López, prófugos en México, fueron inculpados por la justicia estadounidense por narcotráfico.', 'Nacional');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`idnews`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `noticias`
--
ALTER TABLE `noticias`
  MODIFY `idnews` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=945;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
