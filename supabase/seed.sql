-- Seed data generated from the live database (source of truth: src/types/project.ts). Safe to re-run (upsert on id).

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$ahl-al-kahf$t$,
  $t$archive$t$,
  1,
  $t$Ahl Al-Kahf أهل الكهف$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["Cinema of Leak — happening, with Ahl-Al Kahf collective","Djerba, Tunisia","2012"]$j$::jsonb,
  $j$[]$j$::jsonb,
  $j$[{"src":"/images/works/ahl-01.jpg","type":"image"},{"text":"Cinema of Leak — a happening organised with the Ahl Al-Kahf (People of the Cave) collective in Djerba, Tunisia, 2012.","type":"text"},{"text":"Ahl Al-Kahf was an anonymous street art and agitation collective active in Tunisia during and after the revolution, working with walls, screenings and public interventions as forms of political address.","type":"text"},{"src":"/images/works/ahl-02.jpeg","type":"image"},{"src":"/images/works/ahl-03.jpeg","type":"image"},{"src":"/images/works/ahl-04.jpeg","type":"image"},{"src":"/images/works/ahl-05.jpeg","type":"image"},{"src":"/images/works/ahl-06.jpeg","type":"image"},{"src":"/images/works/ahl-07.jpeg","type":"image"},{"src":"/images/works/ahl-08.jpeg","type":"image"},{"src":"/images/works/ahl-09.jpeg","type":"image"},{"src":"/images/works/ahl-10.jpg","type":"image"},{"src":"/images/works/ahl-11.jpg","type":"image"},{"src":"/images/works/ahl-12.jpg","type":"image"},{"src":"/images/works/ahl-13.jpg","type":"image"},{"src":"/images/works/ahl-14.jpg","type":"image"},{"src":"/images/works/ahl-15.jpg","type":"image"},{"src":"/images/works/ahl-16.jpeg","type":"image"},{"src":"/images/works/ahl-17.jpg","type":"image"},{"src":"/images/works/ahl-18.jpg","type":"image"},{"src":"/images/works/ahl-19.jpg","type":"image"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$$t$,
  $j$["/images/works/ahl-01.jpg","/images/works/ahl-02.jpeg","/images/works/ahl-03.jpeg","/images/works/ahl-04.jpeg","/images/works/ahl-05.jpeg","/images/works/ahl-06.jpeg","/images/works/ahl-07.jpeg","/images/works/ahl-08.jpeg","/images/works/ahl-09.jpeg","/images/works/ahl-10.jpg","/images/works/ahl-11.jpg","/images/works/ahl-12.jpg","/images/works/ahl-13.jpg","/images/works/ahl-14.jpg","/images/works/ahl-15.jpg","/images/works/ahl-16.jpeg","/images/works/ahl-17.jpg","/images/works/ahl-18.jpg","/images/works/ahl-19.jpg"]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$i-muri$t$,
  $t$archive$t$,
  2,
  $t$I muri di Tunisi — The walls of Tunis, Signs of Revolt$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["publication, with Luce Lacquaniti","Exorma edizioni, Rome, Italy","2015"]$j$::jsonb,
  $j$[{"href":"https://www.exormaedizioni.com/catalogo/i-muri-di-tunisi/","label":"Exorma edizioni"}]$j$::jsonb,
  $j$[{"src":"/images/works/imuri-01.jpg","type":"image"},{"text":"I muri di Tunisi — The walls of Tunis, Signs of Revolt. Publication with Luce Lacquaniti, Exorma edizioni, Rome, 2015.","type":"text"},{"text":"The book reads the revolution through its walls: the graffiti, slogans, erasures and repaintings that turned the surfaces of Tunis into a contested archive of the uprising and its aftermath.","type":"text"},{"src":"/images/works/imuri-02.jpg","type":"image"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$$t$,
  $j$["/images/works/imuri-01.jpg","/images/works/imuri-02.jpg"]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$arab-presence$t$,
  $t$lecture-performance$t$,
  1,
  $t$Die arabische Präsenz im Deutschland der Zwischenkriegszeit: Sonic Resistance und die Frequenzen des Widerstands$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["Die arabische Präsenz im Deutschland der Zwischenkriegszeit: Sonic Resistance und die Frequenzen des Widerstands","lecture performance","Refo Kapelle, Refo Moabit — Wiclefstraße 32, 10551 Berlin","2025"]$j$::jsonb,
  $j$[]$j$::jsonb,
  $j$[{"text":"Lecture performance by Mohamed-Ali Ltaief in der Refo Kapelle zur Eröffnung der Ausstellung SONIC RESISTANCE.","type":"text"},{"text":"The lecture negotiates the Arab presence in interwar Germany through the frequencies of sonic resistance and survival: the record labels, exiled musicians, dancers and anti-colonial networks that circulated between Berlin, Tunis, Cairo and Beirut in the first decades of the twentieth century.","type":"text"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$$t$,
  $j$[]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$wayward$t$,
  $t$lecture-performance$t$,
  2,
  $t$Wayward Voices in Interwar Modern Art: Grammatology versus Geo-Philosophies$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["Mohamed-Ali Ltaief — Lecture performance","Listening Act II — TheMuseumsLab, Museum für Naturkunde, Berlin","September 9, 2024"]$j$::jsonb,
  $j$[{"href":"https://www.museumfuernaturkunde.berlin/en/about/the-museum/themuseumslab","label":"TheMuseumsLab"}]$j$::jsonb,
  $j$[{"src":"/images/works/wayward-01.jpg","type":"image"},{"text":"MohamedAli Ltaief's lecture performance negotiates and recontextualizes the genealogy of early music records in Tunisia / North Africa and in the diaspora. It situates transnational identities and engages with fragmented biographies of interwar artists, music producers, and dancers who performed in the first decade of the twentieth century.","type":"text"},{"text":"Ltaief expands the connections with the Arab and African Diaspora, specifically focusing on singular histories such as the “Baidaphon” music label (founded in Berlin-Mitte 1912); the Tunisian artists they recorded, the involvement of performing and sound artists in the anti-colonial and anti-fascist era in North Africa and in exile. Ltaief's lecture intertwines with scattered counter-archives that can be read in sound catalogues such as the independent music labels: “Oum-El-Hassen” Tunis 30s, “Rssaissi” Tunis 30s, “Fiesta” Paris 40s, “Maksoud” NYC 10—30s, and “Wardatone” Detroit, USA 50s.","type":"text"},{"text":"to listen without extraction, selchí:meleqel / what does this sound like? / to kick colonial listening habits, to shift structures of feeling / Xwlálámethò:m — Dylan Robinson","type":"text"},{"text":"Sound programme On Sonic Restitutions and the Public Affects of Phonographic Archives is organised for TheMuseumsLab on Monday 9th September 2024. Drawing from Dylan Robinson's Hungry Listening (2020) the programme hosts three listening acts, a panel moderated by Nnenna Onuoha, and an evening performance by Elsa M'bala at the Museum für Naturkunde. Organised as a sonic gathering, the panel at Spielfeld Hall addresses the under-examined status of sound in restitution discourse. Recognising the neglected status of sound archives, panellists Anette Homann, Mohamed-Ali Ltaief and Elsa M'bala introduce their critical engagements with colonial sound and early music recordings through research and performative offerings.","type":"text"},{"text":"The panel begins with an offering by Annette Homann, on the Wolof acoustic traces left by Abdoulaye Niang — recorded during the Royal Prussian Phonographic Commission (1915-1918). This 'Weltarchiv', formed by a group of philologists, linguists, musicologists, and anthropologists, recorded the voices of colonial subjects held in internment camps across Germany, resulting in the production of 1,650 shellac records. Contained within these recordings are echoes of African prisoners held in these camps, their refusals, muffled laughters and quiet refrains.","type":"text"},{"text":"MohamedAli Ltaief's lecture performance contends with, and recontextualizes the genealogy of early music records in Tunisia / North Africa and in the diaspora, departing with recordings from the Berliner Phonogramm-Archiv. Closing the panel, Elsa M'bala offers a gesture towards sonic resocialization featuring the oldest recordings made in Cameroon.","type":"text"},{"src":"/images/works/wayward-02.png","type":"image"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$TheMuseumsLab Module 2 — SOUND PROGRAMME. Curated by Naima Hassan. Sound panel presentations by Anette Homann, Mohamed-Ali Ltaief & Elsa M'bala. 13:30 discussion and Q&A moderated by Nnenna Onuoha.$t$,
  $j$["/images/works/wayward-01.jpg","/images/works/wayward-02.png"]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$poeisis$t$,
  $t$lecture-performance$t$,
  3,
  $t$Poeisis, Praxis, and Cultures of Resistance or the non-established Histories of Art in Tunisia$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["Mohamed-Ali Ltaief — Lecture performance","Unpacking our Library #6 — Curator Paz Guevara","Archive Books Berlin, Reinickendorfer Str. 17, 13347 Berlin","2023"]$j$::jsonb,
  $j$[{"href":"https://www.archivesites.org","label":"www.archivesites.org"}]$j$::jsonb,
  $j$[{"src":"/images/works/poeisis-01.jpg","type":"image"},{"text":"5 – 6.30 pm — Reading Circle. Workshop as part of Unpacking our Library #6. By registration: malab@archivesites.org","type":"text"},{"text":"Based on the ongoing research-based project of an artist that confronts and expands the meaning of sonic archives, Mohamed-Ali Ltaief offers a Reading Circle to share and discuss the genealogy of early ethnomusicological field recording in Tunisia, while reassembling cartographies of interwar artists in North Africa and in the diaspora. In the Reading Circle workshop, Ltaief will share a selection of readings that he refers to in his lecture performance, re-contextualizing cuts and ruptures during colonial times, and unraveling the multiplicity of sonic performative practices. The Reading Circle is open to everyone interested in African performance art histories and sonic performative art practices, anti-colonial and anti-fascist early political movements in North Africa, decolonial theories, and practices of transformation of archives.","type":"text"},{"text":"7 – 8 pm — Unpacking our Library #6: Poeisis, Praxis, and Cultures of Resistance or the non-established Histories of Art in Tunisia.","type":"text"},{"text":"Unpacking Our Library invites Tunisian artist and author Mohamed-Ali Ltaief to re-entangle and negotiate the meaning of a North African sonic archive collection recorded during the first decade of the 20th Century by the Prussian Phonographic Commissions in North Africa, and now stored and dispersed, in part at the Berliner Phonogramm Archiv (SMB) at the Ethnologisches Museum in Berlin and in part at the Ennejma Ezzahra in Tunis.","type":"text"},{"text":"Ltaief's lecture performance questions the dispositive of sonic archival material in those collections by displacing the Ethno-musicological illusion. Through the lecture, Ltaief revoices extended biographies and foregrounds sonic performances, confronting the static sonic archival materiality and the corporate identity of the Western aesthetic taxonomy. By shifting the sonic archive into a spatialized and performative practice, Ltaief opens those archives to art histories across Berlin, Beirut, Cairo, and Tunis. Acknowledging the intrinsic multiplicity of art as a concept of “Poiesis and Praxis”, the lecture is composed of acts of translating lyrics, retracing movements-body language, and re-locating biographies and counter archives.","type":"text"},{"text":"This lecture performance is a sonic-visual and geo-philosophical narrative that combines sonic testimonies with spatial strategies, border studies, and decolonial aesthetic methods. It is part of ‘the Striated Time’ performance trilogy project and publication.","type":"text"},{"src":"/images/works/poeisis-02.jpg","type":"image"},{"src":"/images/works/poeisis-03.jpg","type":"image"},{"src":"/images/works/poeisis-04.jpg","type":"image"},{"src":"/images/works/poeisis-05.jpg","type":"image"},{"src":"/images/works/poeisis-06.jpg","type":"image"},{"src":"/images/works/poeisis-07.jpeg","type":"image"},{"src":"/images/works/poeisis-08.jpg","type":"image"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$Publishing Practices 3 — Weaving the Inner Bark Festival. With the kind support of Mophradat Consortium Commissions 2023/25, Jaou Festival Tunisia, and Ennejma Ezzahra Tunis. — Courtesy Center of Arab and Mediterranean Music (CMAM)$t$,
  $j$["/images/works/poeisis-01.jpg","/images/works/poeisis-02.jpg","/images/works/poeisis-03.jpg","/images/works/poeisis-04.jpg","/images/works/poeisis-05.jpg","/images/works/poeisis-06.jpg","/images/works/poeisis-07.jpeg","/images/works/poeisis-08.jpg"]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$what-can-we-learn$t$,
  $t$lecture-performance$t$,
  4,
  $t$What Can We Learn and Unlearn When We Speak Together?$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["panel / Q&A with Joan Kee and the Otolith Group","Jaou encounters, Tunis, Tunisia","2022"]$j$::jsonb,
  $j$[{"href":"http://jaou.tn/sites/default/files/JAOU%20PHOTO%20PROGRAM.pdf","label":"Jaou programme (PDF)"}]$j$::jsonb,
  $j$[{"src":"/images/works/whatcan-01.jpeg","type":"image"},{"text":"Panel and Q&A with Joan Kee and the Otolith Group at Jaou encounters, Tunis, 2022.","type":"text"},{"text":"The conversation gathered around questions of collective unlearning, the circulation of images and sound across the Global South, and the forms of address that emerge when artists, writers and researchers speak together rather than about one another.","type":"text"},{"src":"/images/works/whatcan-02.jpeg","type":"image"},{"src":"/images/works/whatcan-03.jpeg","type":"image"},{"src":"/images/works/whatcan-04.jpeg","type":"image"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$$t$,
  $j$["/images/works/whatcan-01.jpeg","/images/works/whatcan-02.jpeg","/images/works/whatcan-03.jpeg","/images/works/whatcan-04.jpeg"]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$for-the-practice$t$,
  $t$lecture-performance$t$,
  5,
  $t$For the Practice of the Common$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["lecture performance","S.a.L.E. Docks, Venezia, Italy","2012"]$j$::jsonb,
  $j$[{"href":"http://www.saledocks.org/","label":"S.a.L.E. Docks"}]$j$::jsonb,
  $j$[{"src":"/images/works/practice-01.jpg","type":"image"},{"text":"Lecture performance at S.a.L.E. Docks, Venice, 2012.","type":"text"},{"text":"Delivered in the aftermath of the Tunisian revolution and within the occupied spaces of Venice, the lecture addressed the practice of the common: self-organisation, occupation as a cultural form, and the shared infrastructures that artists and activists build outside institutional frameworks.","type":"text"},{"src":"/images/works/practice-02.jpg","type":"image"},{"src":"/images/works/practice-03.jpg","type":"image"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$$t$,
  $j$["/images/works/practice-01.jpg","/images/works/practice-02.jpg","/images/works/practice-03.jpg"]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$i-hear-the-old-sound-of-the-worlds-future$t$,
  $t$main$t$,
  1,
  $t$I Hear The Old Sound of The World's Future$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["Exhibition and Research Project","B7L9 Art Centre, Tunis","24 April – 5 July 2026"]$j$::jsonb,
  $j$[]$j$::jsonb,
  $j$[{"src":"/images/works/i-hear-01.jpg","type":"image"},{"text":"The Kamel Lazaar Foundation is pleased to present the exhibition “I Hear The Old Sound of The World’s Future” by Berlin-based Tunisian artist Mohamed-Ali Ltaief at B7L9 Art Centre.","type":"text"},{"text":"The exhibition considers the profound connections between sound, memory, and histories by revisiting early 20th-century North African sonic archives and listening to the stories they hold. Through his research, Ltaief investigates colonial-era sound recordings produced by the Prussian Phonographic Commission between 1915 and 1918. These archives contain the vocal recordings of North African prisoners held in German war camps. Today, these sound collections are stored across institutions such as the SMB museums in Berlin and Ennejma Ezzahra in Tunis and in different counter-archives. By returning to these fragmented archives and the lives behind them, the artist foregrounds overlooked histories and voices.","type":"text"},{"text":"The exhibition engages a multi-channel video installation, giving space for sound to become spatial, visual, and performative, opening new ways of entangling with these testimonies. The opening will take place on Friday, April 24, at 6:00 PM, and the exhibition will run until July 5, 2026. “I Hear The Old Sound of The World’s Future” invites the audience to listen differently, recognizing how sound carries memory through time and continues to echo today.","type":"text"},{"text":"B7L9 Art Centre Tunis\nCoproduced with Archipel — International festival of musical creation Geneva\nA project conceived by Mohamed Ali Ltaief\nSound: Lamin Fofana","type":"text"},{"text":"Over the last three years, together with artists, performers, thinkers, musicians and comrades, we have been reentangling the histories of sound and music recording in North Africa, Sub-Saharan countries and in the diaspora during the first decade of the twentieth century.","type":"text"},{"text":"The ongoing research has been built step by step, sound upon sound, through intensive collaboration with those who worked closely with Mohamed Ali Ltaief. After coming to fruition in Tunisia, the project continued to grow by connecting with a range of collaborative hosts: Ennejma Ezzahra in Tunis, Berliner Phonogramm-Archiv, Lautarchiv der Humboldt-Universität zu Berlin, Institute for Contemporary Publishing Archives (IMEC), and different counter-archives.","type":"text"},{"text":"The project investigates the legacy of the North African sound archive collections recorded by European music labels and the Prussian Phonographic Commissions in Germany and North Africa during the first decade of the twentieth century. Specifically, it retraces the early phonogram sound archives that were commissioned and classified during the 1910s, and are today stored dispersed, in part at the Berliner Phonogramm-Archiv, Lautarchiv der Humboldt-Universität zu Berlin, the Ethnologisches Museum in Berlin, and in part at the Ennejma Ezzahra in Tunis (CMAM), as well as in various counter-archives. These sound archives include prompt ethnographic recordings made by the Prussian Phonographic Commission, founded by Wilhelm Doegen, with a group of philologists, linguists, and ethno-musicologists who captured the voices of colonial subjects imprisoned in war camps across Germany, producing approximately 1,650 shellac recordings made between 1915 and 1918. Some of these prisoners were Tunisians, such as Sadok Ben Rachid Haj Youssef. The Weltarchiv (Imperial World Archive) continues today to retain the vocal traces of Muslim prisoners of war.","type":"text"},{"text":"These early recordings contain the echoes of Asian and African prisoners of war held in these camps, including their refusals, muffled laughter, and quiet refrains. Still, these shellac records are stored at the Humboldt Forum’s Lautarchiv in the German capital, constituting an archival register of African, Asian, and European languages recorded under the auspices of German imperial knowledge production. Ltaief revives fragmented biographies and foregrounds sonic expressions by shifting the sound testimonies into a spatialised, visual, and performative practice. The components of the project include a multi-channel video installation, ceramic artwork, archival display, and diagrams printed on fabric retracing the histories of phonographic recording in the Arab world and across the diaspora.","type":"text"},{"src":"/images/works/i-hear-02.jpg","type":"image"},{"src":"/images/works/i-hear-03.png","type":"image"},{"src":"/images/works/i-hear-04.jpg","type":"image"},{"src":"/images/works/i-hear-05.jpg","type":"image"},{"src":"/images/works/i-hear-06.jpg","type":"image"},{"src":"/images/works/i-hear-07.jpg","type":"image"},{"src":"/images/works/i-hear-08.jpg","type":"image"},{"src":"/images/works/i-hear-09.jpg","type":"image"},{"src":"/images/works/i-hear-10.jpg","type":"image"},{"src":"/images/works/i-hear-11.jpg","type":"image"},{"src":"/images/works/i-hear-12.jpg","type":"image"},{"src":"/images/works/i-hear-13.jpg","type":"image"},{"src":"/images/works/i-hear-14.jpg","type":"image"},{"src":"/images/works/i-hear-15.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/i-hear-the-old-sound-of-the-worlds-future/1786119543264-2-channel-videoinstallation-Mohamed-Ali-Ltaief---B7L9-2026---Mehdi-Ben-Temessek--100-.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/i-hear-the-old-sound-of-the-worlds-future/1786119596001-Mohamed-Ali-Ltaief---B7L9-2026---Mehdi-Ben-Temessek--139-.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/i-hear-the-old-sound-of-the-worlds-future/1786119608462-Mohamed-Ali-Ltaief---B7L9-2026---Mehdi-Ben-Temessek--78-.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/i-hear-the-old-sound-of-the-worlds-future/1786119665247-2-untitled--The-Gift--1916-2.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/i-hear-the-old-sound-of-the-worlds-future/1786119695987-Mohamed-Ali-Ltaief---B7L9-2026---Mehdi-Ben-Temessek--68-.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/i-hear-the-old-sound-of-the-worlds-future/1786119710448-Mohamed-Ali-Ltaief---B7L9-2026---Mehdi-Ben-Temessek--61-.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/i-hear-the-old-sound-of-the-worlds-future/1786119722841-Mohamed-Ali-Ltaief---B7L9-2026---Mehdi-Ben-Temessek--176-.jpg","type":"image"}]$j$::jsonb,
  $j$["https://vimeo.com/1215547790 ","1215271194","1215270744","1215270069","1215268506"]$j$::jsonb,
  $t$$t$,
  $j$["/images/works/i-hear-01.jpg","/images/works/i-hear-02.jpg","/images/works/i-hear-03.png","/images/works/i-hear-04.jpg","/images/works/i-hear-05.jpg","/images/works/i-hear-06.jpg","/images/works/i-hear-07.jpg","/images/works/i-hear-08.jpg","/images/works/i-hear-09.jpg","/images/works/i-hear-10.jpg","/images/works/i-hear-11.jpg","/images/works/i-hear-12.jpg","/images/works/i-hear-13.jpg","/images/works/i-hear-14.jpg","/images/works/i-hear-15.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/i-hear-the-old-sound-of-the-worlds-future/1786119543264-2-channel-videoinstallation-Mohamed-Ali-Ltaief---B7L9-2026---Mehdi-Ben-Temessek--100-.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/i-hear-the-old-sound-of-the-worlds-future/1786119596001-Mohamed-Ali-Ltaief---B7L9-2026---Mehdi-Ben-Temessek--139-.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/i-hear-the-old-sound-of-the-worlds-future/1786119608462-Mohamed-Ali-Ltaief---B7L9-2026---Mehdi-Ben-Temessek--78-.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/i-hear-the-old-sound-of-the-worlds-future/1786119665247-2-untitled--The-Gift--1916-2.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/i-hear-the-old-sound-of-the-worlds-future/1786119695987-Mohamed-Ali-Ltaief---B7L9-2026---Mehdi-Ben-Temessek--68-.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/i-hear-the-old-sound-of-the-worlds-future/1786119710448-Mohamed-Ali-Ltaief---B7L9-2026---Mehdi-Ben-Temessek--61-.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/i-hear-the-old-sound-of-the-worlds-future/1786119722841-Mohamed-Ali-Ltaief---B7L9-2026---Mehdi-Ben-Temessek--176-.jpg"]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$the-concretely-we$t$,
  $t$main$t$,
  2,
  $t$The Concretely WE: Voices From Within The Camp$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["Kaaitheater, Brussels, Belgium — Thursday 23rd and Friday 24th January 2025","Live Works Summit, Centrale Fies, Dro, Italy — July 20th, 2024"]$j$::jsonb,
  $j$[{"href":"https://kaaitheater.be/en/agenda/24-25/concretely-we-voices-within-camp","label":"Kaaitheater"},{"href":"https://www.centralefies.it/liveworks24/","label":"Live Works Summit"},{"href":"https://mophradat.org/en/program/consortium-commissions/2023-2025/","label":"Mophradat consortium-commissions"}]$j$::jsonb,
  $j$[{"src":"/images/works/concretely-01.jpg","type":"image"},{"text":"“Each of the consciousnesses on stage has made the leap, from nothingness to justified Being. From unjustified being to Nothingness, whence the finite appearance of the expression” — Frantz Fanon, Parallel Hands.","type":"text"},{"text":"The story of the protagonist ‘Sadok Ben Rachid’, a Tunisian poet, singer and prisoner of the First World War, overlaps fact and fiction. It is based on research conducted between the archive collections of the Berliner Phonogramm-Archiv, the Lautarchiv Berlin, Frantz Fanon's play 'Parallel Hands' (1949) and other counter-archives. Sadok was a soldier in the North African forces, recruited by the French (1914) and used in the major battles of Europe before being captured by the Germans (1915). He was 37 years old when he made several recordings at the Half-Moon POW camp at Wünsdorf (south of Berlin). On 30 May 1916, at 1.15 in the morning; Sadok stood in front of a horn and sang three war poems.","type":"text"},{"text":"Ltaief's performance research-based project «The Concretely WE: Voices From Within The Camp» investigates and retraces the early phonographic sound archives commissioned and classified in the 1910s. These archives include prompt ethnographic recordings made by the Prussian Phonographic Commission established by Wilhelm Doegen, with a group of linguists and ethnomusicologists who captured the voices of colonial subjects imprisoned in war camps across Germany, producing the following 1,650 shellac records between 1915 and 1918.","type":"text"},{"text":"Fanon's comprehension of colonial violence paralleled his methods of psychiatry, equating the effects of colonialism with the causes of mental illness; a society that has created a disease that can only be eradicated by dismantling its neurological causes; colonialism and its aftermath. Following Fanon's psychoanalytic and theatrical thought, the performance aims to decipher the consequences of colonialism, the apparatus of capture, the use of the bodies and the understanding of alienation that have produced multiple forms of relational illness.","type":"text"},{"text":"Sadok's existential sonic refusal / poem comes as an autobiographical counter-narrative, a form of resistance or rather survival that acknowledges and raises the notions of ethics and aesthetics for those who usually impersonates the voice's subject. Through monologues, visual installation, movement and deep listening, the choreographic and sonic acts are evoked, staged and mediated in a language that is both captive and liberating.","type":"text"},{"text":"In partnership with Ennejma Ezzahra Tunis and Lautarchiv der Humboldt-Universität zu Berlin: the recordings were transferred to the Tunisian National Sound Archive by Humboldt University Berlin's Lautarchiv in January 2025 as part of the ‘Towards Sonic ReSocialisation’ project, funded by the Deutsches Zentrum Kulturgutverluste. The collection comprises 445 historical recordings of voices and music recorded by the Phonographic Commission during the First World War with French colonial soldiers from North Africa and several sub-Saharan African countries in the Muslim prisoner-of-war camp in Zossen-Wünsdorf.","type":"text"},{"src":"/images/works/concretely-02.jpg","type":"image"},{"src":"/images/works/concretely-03.jpg","type":"image"},{"src":"/images/works/concretely-04.jpg","type":"image"},{"src":"/images/works/concretely-05.png","type":"image"},{"src":"/images/works/concretely-06.png","type":"image"},{"src":"/images/works/concretely-07.jpg","type":"image"},{"src":"/images/works/concretely-08.jpg","type":"image"},{"src":"/images/works/concretely-09.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/the-concretely-we/1786119853702-IMG_9207.jpeg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/the-concretely-we/1786119854829-ph-Alessandro-Sala_courtesy-Centrale-Fies_SAA9446-copy.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/the-concretely-we/1786119856354-il-manifesto-del-28-luglio-2024-11.jpg","type":"image"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$Concept & text Mohamed-Ali Ltaief | performance Mohamed-Ali Ltaief | with Lamin Fofana and Tarxun | performance part of The Striated Time performance trilogy project | curated by Barbara Boninsegna and Simone Frangi | with the kind support of the Mophradat consortium commissions 2023-25 | co-production Centrale Fies, Dro (IT), Kaaitheater (BE), and Tanzfabrik (DE) | photographs at Centrale Fies Italy 2024 and Kaaistudios Brussels 2025 | ph Alessandro Sala | courtesy Centrale Fies$t$,
  $j$["/images/works/concretely-01.jpg","/images/works/concretely-02.jpg","/images/works/concretely-03.jpg","/images/works/concretely-04.jpg","/images/works/concretely-05.png","/images/works/concretely-06.png","/images/works/concretely-07.jpg","/images/works/concretely-08.jpg","/images/works/concretely-09.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/the-concretely-we/1786119853702-IMG_9207.jpeg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/the-concretely-we/1786119854829-ph-Alessandro-Sala_courtesy-Centrale-Fies_SAA9446-copy.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/the-concretely-we/1786119856354-il-manifesto-del-28-luglio-2024-11.jpg"]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$parallel-hands$t$,
  $t$main$t$,
  3,
  $t$Parallel Hands — Co-existence of Times and the Good Will to Listen$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["performance","Tanzfabrik Berlin","24.02.2024"]$j$::jsonb,
  $j$[{"href":"https://mophradat.org/en/program/consortium-commissions/2023-2025/","label":"Mophradat consortium-commissions"}]$j$::jsonb,
  $j$[{"src":"/images/works/parallel-01.jpg","type":"image"},{"text":"Ltaief's research performance project «Parallel Hands — Co-existence of Times and the Good Will to Listen» investigates the legacy of North African sonic archives in the collection of Berliner Phonogramm-Archiv and Ethnologisches Museum in Berlin. It specifically re-traces the early phonogram sound archives that were commissioned and classified during the 1910s and are today settled in ethnomusicological collections stored in Berlin at SMB museums.","type":"text"},{"text":"These archives include recordings made by the German Phonographic Commission, established by Wilhelm Doegen and assisted by Robert Lachmann with prisoners of the First World War, between 1915 and 1918 at the Half Moon camp in Wünsdorf (south Berlin). Some of these prisoners were Tunisian, like Sadok Ben Rashid.","type":"text"},{"text":"This project critically investigates notions of record and archive, raising questions about ethnological field recording practices under the violence of European Colonialism; about the limits of translation, and the enduring myth of universal art doctrines.","type":"text"},{"text":"* The double showing is followed by a discussion with the artists *","type":"text"},{"src":"/images/works/parallel-02.jpg","type":"image"},{"src":"/images/works/parallel-03.jpg","type":"image"},{"src":"/images/works/parallel-04.jpg","type":"image"},{"src":"/images/works/parallel-05.jpg","type":"image"},{"src":"/images/works/parallel-06.jpg","type":"image"},{"src":"/images/works/parallel-07.jpg","type":"image"},{"src":"/images/works/parallel-08.jpg","type":"image"},{"src":"/images/works/parallel-09.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/parallel-hands/1786120597611-tf-07173.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/parallel-hands/1786120622500-black-curtains2.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/parallel-hands/1786120643424-tf-07195.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/parallel-hands/1786120655617-Sit1.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/parallel-hands/1786120659284-black-curtains2.jpg","type":"image"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$Concept and text: Mohamed-Ali Ltaief | Performance: Mohamed-Ali Ltaief & Tarxun | Curated by Barbara Boninsegna and Simone Frangi | coproduction: Centrale Fies, Dro (IT), Kaaitheater Brussels (BE) and Tanzfabrik Berlin (DE) | Mophradat consortium-commissions 2023-2025$t$,
  $j$["/images/works/parallel-01.jpg","/images/works/parallel-02.jpg","/images/works/parallel-03.jpg","/images/works/parallel-04.jpg","/images/works/parallel-05.jpg","/images/works/parallel-06.jpg","/images/works/parallel-07.jpg","/images/works/parallel-08.jpg","/images/works/parallel-09.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/parallel-hands/1786120597611-tf-07173.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/parallel-hands/1786120622500-black-curtains2.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/parallel-hands/1786120643424-tf-07195.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/parallel-hands/1786120655617-Sit1.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/parallel-hands/1786120659284-black-curtains2.jpg"]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$the-path-of-the-sun-or-the-bare-life$t$,
  $t$main$t$,
  4,
  $t$The Path of the Sun or the Bare Life$t$,
  $t$The Path of the Sun or the Bare Life طريق الشمس$t$,
  $j$["أو الحياة العارية"]$j$::jsonb,
  $j$["طريق الشمس أو الحياة العارية","performance","Madrasa El Achouria, Tunis","22.06.2021"]$j$::jsonb,
  $j$[]$j$::jsonb,
  $j$[{"src":"/images/works/pathsun-01.jpg","type":"image"},{"text":"Mohamedali conducted research during his residency in Tunis on the market of Chinese products: the Boumendil market in the Medina of Tunis. In particular, he investigates the impact of the Chinese market on Boumendi street history / the Medina of Tunis and explores with Omar Karray their particular soundscape.","type":"text"},{"text":"Research / residency — Exile in Arabic is Eghtirab — Moghtareb which means, the person who walks towards the sunset — Ghouroub. The exile is an utopian counter-space as Michel Foucault says in the utopia of the body: “My body is like the city of the sun, it has no place, but it is from itself that emerge and shine all possible places, real ones or utopic ones”.","type":"text"},{"src":"/images/works/pathsun-02.jpg","type":"image"},{"src":"/images/works/pathsun-03.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/the-path-of-the-sun-or-the-bare-life/1786120086136-20210622_LArtRue_0107-copy.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/the-path-of-the-sun-or-the-bare-life/1786120086468-202770900_4283313901718958_3865273272059003337_n.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/the-path-of-the-sun-or-the-bare-life/1786120148709-IMG_6271.JPG","type":"image"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$A performance project by Mohamedali Ltaief with Omar Karray and Rindala Pereverzev | video Imed Aouadi | sound Omar Karray | video performance Slim Baccar | Voices: Marina Resende Santos, Ayed Fadhel, Rindala Pereverzev and Mohamedali Ltaief | production manager Wissal Bettaibi | Production of L'Art Rue — Supported by Goethe-Institut Tunis and the Arab Fund for Arts and Culture — AFAC. Research grants in the field of performing arts/dance 2019 — Senate Berlin.$t$,
  $j$["/images/works/pathsun-01.jpg","/images/works/pathsun-02.jpg","/images/works/pathsun-03.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/the-path-of-the-sun-or-the-bare-life/1786120086136-20210622_LArtRue_0107-copy.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/the-path-of-the-sun-or-the-bare-life/1786120086468-202770900_4283313901718958_3865273272059003337_n.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/the-path-of-the-sun-or-the-bare-life/1786120148709-IMG_6271.JPG"]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$hundert$t$,
  $t$main$t$,
  5,
  $t$Hundert Jahre$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["Darja Stocker and Mohamed-Ali Ltaief — PREMIERE","Theater Basel, Basel, Switzerland","18.10.2019"]$j$::jsonb,
  $j$[{"href":"https://www.theater-basel.ch/","label":"Theater Basel"}]$j$::jsonb,
  $j$[{"src":"/images/works/hundert-01.jpg","type":"image"},{"text":"”Reto” has been an outcast all his life. From early childhood, he is continually being sent away: from his father in Basel to his mother in Geneva, as a child labourer from one farm to the next. In his search for affection and recognition, he is repeatedly degraded and humiliated.","type":"text"},{"text":"Eventually, he finds himself on a ship from Marseille to Algiers, going to war as a mercenary and trying his luck in the Foreign Legion. The Legion suggests togetherness and security but at the same time, it means constantly living in fear. Finally, Reto is called to account in a court trial and is forced to look back on his life of torment.","type":"text"},{"src":"/images/works/hundert-02.jpg","type":"image"},{"src":"/images/works/hundert-03.jpg","type":"image"},{"src":"/images/works/hundert-04.webp","type":"image"},{"src":"/images/works/hundert-05.jpg","type":"image"},{"src":"/images/works/hundert-06.jpg","type":"image"},{"src":"/images/works/hundert-07.jpg","type":"image"},{"src":"/images/works/hundert-08.png","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/hundert/1786120205017-3.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/hundert/1786120205491-1f37a35045bb61fb68a5cda93e0bf37b_80_fitToWidth.webp","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/hundert/1786120228760-1Hundert-Jahre_TheaterBasel2019.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/hundert/1786120237181-hundertjahre1.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/hundert/1786120249665-HundertJahreC1.jpg","type":"image"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$Production Theater Basel, Basel, Switzerland | Schauspiel von: Darja Stocker und Mohamedali Ltaief | REGIE Franz-Xaver Mayr | MIT Jonas Götzinger, Jeanne Devos, Pascal Goffin, Matthias Luckey, David Michael Werner, Julius Schröder, Malte Homfeldt, Maximilian Kraus | Foto: kimculetto$t$,
  $j$["/images/works/hundert-01.jpg","/images/works/hundert-02.jpg","/images/works/hundert-03.jpg","/images/works/hundert-04.webp","/images/works/hundert-05.jpg","/images/works/hundert-06.jpg","/images/works/hundert-07.jpg","/images/works/hundert-08.png","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/hundert/1786120205017-3.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/hundert/1786120205491-1f37a35045bb61fb68a5cda93e0bf37b_80_fitToWidth.webp","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/hundert/1786120228760-1Hundert-Jahre_TheaterBasel2019.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/hundert/1786120237181-hundertjahre1.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/hundert/1786120249665-HundertJahreC1.jpg"]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$ghosts$t$,
  $t$main$t$,
  6,
  $t$Ghosts of Meaning$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["performance","HAU Hebbel am Ufer (HAU2), Berlin, Germany","2019"]$j$::jsonb,
  $j$[{"href":"https://vimeo.com/355958609","label":"Video documentation"}]$j$::jsonb,
  $j$[{"src":"/images/works/ghosts-01.jpg","type":"image"},{"text":"Ghosts of Meaning is a performance presented at HAU Hebbel am Ufer (HAU2) in Berlin, 2019.","type":"text"},{"text":"The work belongs to a series of performative and sonic investigations into language, translation and the residues of meaning that persist beyond speech — the spectral remainders of words displaced across geographies, alphabets and political conditions.","type":"text"},{"src":"/images/works/ghosts-02.jpg","type":"image"},{"src":"/images/works/ghosts-03.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/ghosts/1786120269183-COVER_Ghostsofmeaning_Hightresolution1.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/ghosts/1786120290054-2-copy-2.tiff","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/ghosts/1786120297550-Ghostofmeaning_InSilentgreenBerlin2019.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/ghosts/1786120309246-FRBerlin2019.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/ghosts/1786120369210-_K_T1829.jpg","type":"image"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$$t$,
  $j$["/images/works/ghosts-01.jpg","/images/works/ghosts-02.jpg","/images/works/ghosts-03.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/ghosts/1786120269183-COVER_Ghostsofmeaning_Hightresolution1.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/ghosts/1786120290054-2-copy-2.tiff","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/ghosts/1786120297550-Ghostofmeaning_InSilentgreenBerlin2019.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/ghosts/1786120309246-FRBerlin2019.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/ghosts/1786120369210-_K_T1829.jpg"]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$caliban-cannibal$t$,
  $t$motus$t$,
  1,
  $t$Caliban Cannibal$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["with Motus — 2011 > 2068 AnimalePolitico Project","Santarcangelo Festival, Italy 2014 | MAXXI Museo nazionale delle Arti, Rome 2014","La Friche la Belle de Mai, Marseille 2013 | NEXT Arts Festival, Lille 2015"]$j$::jsonb,
  $j$[{"href":"https://motusonline.com/progetti/","label":"Motus"}]$j$::jsonb,
  $j$[{"src":"/images/works/caliban-01.jpg","type":"image"},{"text":"Mohamed-Ali Ltaief and Silvia Calderoni © Motus.","type":"text"},{"text":"After the tempest, a brief stopover and a journey, a lightweight emergency tent is quickly set up in empty public and private spaces, from squares and parks to shopping centres and theatres. This suspended, transitory non-place is inhabited by two unlikely characters: A and C. They are together by chance and necessity, having landed in this shelter after experiencing tormented events involving actual and existential crises, grand gestures and unfulfilled demands. They attempt to communicate despite not speaking the same language, trying to recount their stories in a mixture of Italian, French, Arabic and mangled English. They try to support each other, but lack the strength to do so fully.","type":"text"},{"text":"'A' could be Ariel after the tempest: aphasic and narcoleptic, in full confrontation with a freedom that was sought after in slogans but fundamentally feared. She is as fragile as the chrysanthemum, 'the flower of the dead', which she has brought with her. C could be Caliban after the explosion on the island, after the attack on Prospero. After the fireworks and the 'Tunisian Revolution'.","type":"text"},{"text":"Silvia and Mohamed-Ali (Dalí) have thrown themselves into the 'occhio belva' of the camera, inhabiting the space and getting to know each other properly, trying to transcend limits and 'transform carbon dioxide into oxygen' … Violent Flowers. They carry pieces of crossed worlds on their bodies, remnants of desires now piled in a corner of their refuge. A shelter, a hut? An elsewhere without solid foundations. It's in danger of being destroyed by the first storm, but what's the problem? We move without inhabiting properly, and we inhabit without questioning stability. We are fractures of time and space.","type":"text"},{"src":"/images/works/caliban-02.jpg","type":"image"},{"src":"/images/works/caliban-03.jpg","type":"image"},{"src":"/images/works/caliban-04.jpg","type":"image"},{"src":"/images/works/caliban-05.jpeg","type":"image"},{"src":"/images/works/caliban-06.jpg","type":"image"},{"src":"/images/works/caliban-07.jpg","type":"image"},{"src":"/images/works/caliban-08.jpg","type":"image"},{"src":"/images/works/caliban-09.jpeg","type":"image"},{"src":"/images/works/caliban-10.jpg","type":"image"},{"src":"/images/works/caliban-11.png","type":"image"},{"src":"/images/works/caliban-12.jpg","type":"image"},{"src":"/images/works/caliban-13.jpg","type":"image"},{"src":"/images/works/caliban-14.png","type":"image"},{"src":"/images/works/caliban-15.jpg","type":"image"},{"src":"/images/works/caliban-16.jpg","type":"image"},{"src":"/images/works/caliban-17.jpg","type":"image"},{"src":"/images/works/caliban-18.jpg","type":"image"},{"src":"/images/works/caliban-19.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120810984-te-le-chargement--1----copie.jpeg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120812070-te-le-chargement---copie-2.jpeg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120812372-press5.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120816311-press4.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120816569-press2.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120818052-press1.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120842188-europe.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120842517-hello-stranger-fichier-1.tiff","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120843432-caliban5.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120856179-caliban3.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120865745-IMG_1525.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120900152-1383471_10151724380866775_998454896_n.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120900655-1383078_10151724383526775_1938563513_n.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120901037-10714324_10152567145351775_8281172611145480332_o.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120901331-11049336_1426176671011397_880545804_n.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120901557-11085118_1424206111207963_1488193855_n.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120901802-11117170_1400175920304586_267169702_n.jpg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120902006-12145288_492018474309012_1196545941_n.jpg","type":"image"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$by Enrico Casagrande and Daniela Nicolò | with Silvia Calderoni and Mohamed Ali Ltaief | installation & art work Mohamed Ali Ltaief | video Enrico Casagrande, Mohamed Ali Ltaief, Andrea Gallo and Alessio Spirli | a video contribution from Philosophers' Republic by Mohamed Ali Ltaief and Darja Stocker | Photography Andrea Macchia + Valeria Tommasulo | assistant director Ilenia Caleo | production Motus 2011 > 2068 AnimalePolitico Project within the Ateliers l'Euroméditerranée Marseille Provence 2013 | with the support of Santarcangelo•12•13•14$t$,
  $j$["/images/works/caliban-01.jpg","/images/works/caliban-02.jpg","/images/works/caliban-03.jpg","/images/works/caliban-04.jpg","/images/works/caliban-05.jpeg","/images/works/caliban-06.jpg","/images/works/caliban-07.jpg","/images/works/caliban-08.jpg","/images/works/caliban-09.jpeg","/images/works/caliban-10.jpg","/images/works/caliban-11.png","/images/works/caliban-12.jpg","/images/works/caliban-13.jpg","/images/works/caliban-14.png","/images/works/caliban-15.jpg","/images/works/caliban-16.jpg","/images/works/caliban-17.jpg","/images/works/caliban-18.jpg","/images/works/caliban-19.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120810984-te-le-chargement--1----copie.jpeg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120812070-te-le-chargement---copie-2.jpeg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120812372-press5.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120816311-press4.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120816569-press2.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120818052-press1.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120842188-europe.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120842517-hello-stranger-fichier-1.tiff","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120843432-caliban5.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120856179-caliban3.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120865745-IMG_1525.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120900152-1383471_10151724380866775_998454896_n.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120900655-1383078_10151724383526775_1938563513_n.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120901037-10714324_10152567145351775_8281172611145480332_o.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120901331-11049336_1426176671011397_880545804_n.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120901557-11085118_1424206111207963_1488193855_n.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120901802-11117170_1400175920304586_267169702_n.jpg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/caliban-cannibal/1786120902006-12145288_492018474309012_1196545941_n.jpg"]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$call-me-x$t$,
  $t$motus$t$,
  2,
  $t$CALL ME X$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["video-installation with Motus — 2011 > 2068 AnimalePolitico Project","Festival Santarcangelo 14, Rimini, Italy","2014"]$j$::jsonb,
  $j$[]$j$::jsonb,
  $j$[{"src":"/images/works/callmex-01.jpg","type":"image"},{"text":"It is with these words that Motus launched the project Animale Politico 2011>2068. The company is now returning to Santarcangelo, the place where it all began, in order to look backwards and outline the cartography of these intense years of research and encounters with “extraordinary women and men”.","type":"text"},{"text":"Call me X is an attempt to reassemble the images of the company's latest theatrical and life adventure, represented by performative actions, workshops, residencies, public conferences and urban interventions. Motus embarks on a trip following the crumb trail of documents and relics left by the heterogenous endeavor that generated Nella Tempesta and Caliban Cannibal.","type":"text"},{"text":"What emerges is an artistic itinerary marked by temporary experiences and landscapes located inside an “elsewhere” that the company inhabits like a climbing plant, always on the edge.","type":"text"},{"src":"/images/works/callmex-02.jpg","type":"image"},{"src":"/images/works/callmex-03.jpeg","type":"image"},{"src":"https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/call-me-x/1786120976099-caliban0.jpg","type":"image"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$$t$,
  $j$["/images/works/callmex-01.jpg","/images/works/callmex-02.jpg","/images/works/callmex-03.jpeg","https://avblkhwdufwkrkujyehw.supabase.co/storage/v1/object/public/gallery/call-me-x/1786120976099-caliban0.jpg"]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$feel-the-sound$t$,
  $t$writing-publishing$t$,
  1,
  $t$Feel the Sound$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["An exhibition experience on a different frequency","Barbican Centre, London, England","22 May – 31 Aug 2025"]$j$::jsonb,
  $j$[{"href":"https://www.barbican.org.uk/whats-on/2025/event/feel-the-sound","label":"Barbican Centre"},{"href":"https://niewmedia.com/en/news/056850/","label":"MoN Takanawa: The Museum of Narratives, Tokyo"}]$j$::jsonb,
  $j$[{"text":"Opening in May 2025, the Barbican announces Feel the Sound, a bold new multi-sensory exhibition experience exploring our personal relationship to sound and embracing a world of listening that goes beyond the audio. Through a series of eleven commissions and installations including six new commissions — Feel the Sound — takes place in spaces across the Barbican Centre, from the entrance on Silk Street, in The Curve, the public foyers, to outdoors on the Centre's Lakeside Terrace. For the first time, the Centre's underground Car Parks will also be part of the exhibition experience.","type":"text"},{"text":"Following this premiere run, Feel the Sound will embark on an international tour, including to MoN Takanawa: The Museum of Narratives, Tokyo in late 2026. Frequencies, sound, rhythmic patterns and vibrations define everything around us. From the soundtrack of our environments to the rhythm of our heartbeat, frequencies are constantly creating and changing how we see, hear and feel the world.","type":"text"},{"text":"Feel the Sound is an invitation to awaken the senses, embrace our sonic world and discover the sound in each of us. Each installation will be an opportunity to explore how sound can be experienced in a multitude of ways. By considering our body as a listening device, we can begin to adjust our understanding of ourselves and tune into the world through a different frequency.","type":"text"},{"text":"The exhibition will be accompanied by a playful and unique catalogue, influenced by music and sound magazines, designed by Other Office, a multidisciplinary creative practice run by Simon Sweeney & Shauna Buckley, who specialise in visual identities, interactive work, and printed matter.","type":"text"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$Co-produced by MoN Takanawa: The Museum of Narratives, Takanawa Gateway City, Tokyo, Japan. Exhibition Catalogue | Edited by Taous Dahmani.$t$,
  $j$[]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$chronicles$t$,
  $t$writing-publishing$t$,
  2,
  $t$Chronicles of the Half-Moon$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["writing and publishing practice","2024 – 2025"]$j$::jsonb,
  $j$[]$j$::jsonb,
  $j$[{"src":"/images/works/chronicles-01.jpg","type":"image"},{"text":"Chronicles of the Half-Moon gathers the writing that accompanies the performance and research cycle around the Half Moon camp (Halbmondlager) at Wünsdorf, south of Berlin, where the Royal Prussian Phonographic Commission recorded the voices of colonial prisoners of war between 1915 and 1918.","type":"text"},{"text":"The chronicles assemble archival fragments, translated lyrics, personal files (Personalbogen), biographies and counter-narratives — among them the voice of Sadok Ben Rachid Haj Youssef, a farm worker, poet and singer from Monastir who sang before a gramophone horn in May 1916.","type":"text"},{"text":"The writing moves between document and fiction, refusing the ethnographic frame in which these voices were captured and returning them to the register of poetry, lament and refusal.","type":"text"},{"src":"/images/works/chronicles-02.jpg","type":"image"},{"src":"/images/works/chronicles-03.jpg","type":"image"},{"src":"/images/works/chronicles-04.jpg","type":"image"},{"src":"/images/works/chronicles-05.jpg","type":"image"},{"src":"/images/works/chronicles-06.jpg","type":"image"},{"src":"/images/works/chronicles-07.jpg","type":"image"},{"src":"/images/works/chronicles-08.jpg","type":"image"},{"src":"/images/works/chronicles-09.jpg","type":"image"},{"src":"/images/works/chronicles-10.webp","type":"image"},{"src":"/images/works/chronicles-11.png","type":"image"},{"src":"/images/works/chronicles-12.jpg","type":"image"},{"src":"/images/works/chronicles-13.jpg","type":"image"},{"src":"/images/works/chronicles-14.jpg","type":"image"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$Part of The Striated Time performance trilogy project and publication. With the kind support of the Mophradat consortium commissions 2023-25.$t$,
  $j$["/images/works/chronicles-01.jpg","/images/works/chronicles-02.jpg","/images/works/chronicles-03.jpg","/images/works/chronicles-04.jpg","/images/works/chronicles-05.jpg","/images/works/chronicles-06.jpg","/images/works/chronicles-07.jpg","/images/works/chronicles-08.jpg","/images/works/chronicles-09.jpg","/images/works/chronicles-10.webp","/images/works/chronicles-11.png","/images/works/chronicles-12.jpg","/images/works/chronicles-13.jpg","/images/works/chronicles-14.jpg"]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$strangeness-writing$t$,
  $t$writing-publishing$t$,
  3,
  $t$The Strangeness of the Stranger$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["writing and publishing practice","Book Works, The Happy Hypocrite, London","2021"]$j$::jsonb,
  $j$[{"href":"https://bookworks.org.uk/news/without-reduction-a-twelve-hour-radio-broadcast-by-book-works-for-the-happy-hypocrite/","label":"bookworks.org.uk"}]$j$::jsonb,
  $j$[{"src":"/images/works/strangeness-01.jpg","type":"image"},{"text":"A text and sound work assembled from Abu Hayyan al-Tawhidi, Julia Kristeva, Giorgio Agamben and Samuel Beckett, written for Book Works and The Happy Hypocrite.","type":"text"},{"text":"The writing circles the figure of the stranger — the one whose strangeness is not a property but a relation — and the estrangement produced by borders, translation and exile.","type":"text"},{"src":"/images/works/strangeness-02.jpg","type":"image"},{"src":"/images/works/strangeness-03.jpg","type":"image"},{"src":"/images/works/strangeness-04.jpg","type":"image"},{"src":"/images/works/strangeness-05.jpg","type":"image"},{"src":"/images/works/strangeness-06.jpg","type":"image"},{"src":"/images/works/strangeness-07.jpg","type":"image"},{"src":"/images/works/strangeness-08.jpg","type":"image"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$$t$,
  $j$["/images/works/strangeness-01.jpg","/images/works/strangeness-02.jpg","/images/works/strangeness-03.jpg","/images/works/strangeness-04.jpg","/images/works/strangeness-05.jpg","/images/works/strangeness-06.jpg","/images/works/strangeness-07.jpg","/images/works/strangeness-08.jpg"]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$awham$t$,
  $t$writing-publishing$t$,
  4,
  $t$Awham$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["writing / publishing practice"]$j$::jsonb,
  $j$[]$j$::jsonb,
  $j$[{"src":"/images/works/awham-01.jpg","type":"image"},{"text":"Awham (أوهام) — illusions. An ongoing writing and publishing practice in Arabic and in translation, moving between poetry, note-taking, and the essay.","type":"text"},{"text":"The texts accompany the sonic and performance research, holding what cannot be staged: the residue of listening, the aside, the fragment.","type":"text"},{"src":"/images/works/awham-02.jpg","type":"image"},{"src":"/images/works/awham-03.jpg","type":"image"},{"src":"/images/works/awham-04.jpg","type":"image"},{"src":"/images/works/awham-05.jpg","type":"image"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$$t$,
  $j$["/images/works/awham-01.jpg","/images/works/awham-02.jpg","/images/works/awham-03.jpg","/images/works/awham-04.jpg","/images/works/awham-05.jpg"]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$hello-stranger$t$,
  $t$writing-publishing$t$,
  5,
  $t$Hello Stranger$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["publication, with Motus","Damiani editore, Bologna, Italy","2017"]$j$::jsonb,
  $j$[{"href":"https://www.damianibooks.com/en/products/6208518","label":"Damiani editore"}]$j$::jsonb,
  $j$[{"text":"Hello Stranger — publication with Motus, published by Damiani editore, Bologna, 2017.","type":"text"},{"text":"The book gathers the images, documents and writings produced across the years of the 2011 > 2068 AnimalePolitico Project, and the encounters, journeys and shelters that Caliban Cannibal and Nella Tempesta left behind.","type":"text"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$$t$,
  $j$[]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;

insert into public.projects
  (id, section, position, title, nav_label, sub_lines, lines, links, content, videos, meta, gallery)
values (
  $t$strangeness-radio$t$,
  $t$writing-publishing$t$,
  6,
  $t$The Strangeness of the Stranger$t$,
  null,
  $j$[]$j$::jsonb,
  $j$["sonic performance","Broadcast on Resonance Extra, London","25 September 2021 (from midday to midnight)"]$j$::jsonb,
  $j$[{"href":"https://extra.resonance.fm/","label":"Resonance Extra"},{"href":"https://bookworks.org.uk/news/without-reduction-a-twelve-hour-radio-broadcast-by-book-works-for-the-happy-hypocrite/","label":"bookworks.org.uk"}]$j$::jsonb,
  $j$[{"src":"/images/works/strangeness-01.jpg","type":"image"},{"text":"Text: Abu Hayyan al-Tawhidi, Julia Kristeva, Giorgio Agamben, Samuel Beckett. Recording and sound art: Omar Karray. Voices: Marina Resende, Santos, Ayed Fadhel, Rindala Pereverzev and Mohamedali Ltaief.","type":"text"},{"text":"Part of Without Reduction, a twelve-hour radio broadcast by Book Works for The Happy Hypocrite.","type":"text"},{"src":"/images/works/strangeness-02.jpg","type":"image"},{"src":"/images/works/strangeness-03.jpg","type":"image"},{"src":"/images/works/strangeness-04.jpg","type":"image"},{"src":"/images/works/strangeness-05.jpg","type":"image"},{"src":"/images/works/strangeness-06.jpg","type":"image"},{"src":"/images/works/strangeness-07.jpg","type":"image"},{"src":"/images/works/strangeness-08.jpg","type":"image"}]$j$::jsonb,
  $j$[]$j$::jsonb,
  $t$$t$,
  $j$["/images/works/strangeness-01.jpg","/images/works/strangeness-02.jpg","/images/works/strangeness-03.jpg","/images/works/strangeness-04.jpg","/images/works/strangeness-05.jpg","/images/works/strangeness-06.jpg","/images/works/strangeness-07.jpg","/images/works/strangeness-08.jpg"]$j$::jsonb
)
on conflict (id) do update set
  section = excluded.section,
  position = excluded.position,
  title = excluded.title,
  nav_label = excluded.nav_label,
  sub_lines = excluded.sub_lines,
  lines = excluded.lines,
  links = excluded.links,
  content = excluded.content,
  videos = excluded.videos,
  meta = excluded.meta,
  gallery = excluded.gallery;
