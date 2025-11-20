import React, { useState, useMemo, useRef, useCallback } from 'react';

// --- START: PASTED CONSTITUTION CONTENT (Article Titles & Hierarchy) ---
// This object holds the structure (Parts, Chapters) and the verbatim text 
// of the Articles extracted from the PDF.
const constitutionData = {
  // Using Part I as a placeholder for the Preamble as well, for navigation structure
  'PREAMBLE & PART I': {
    title: 'PREAMBLE & THE UNION AND ITS TERRITORY',
    chapters: {
      'Preamble': {
        title: 'Preamble',
        startArticle: 'Preamble',
        endArticle: 'Preamble',
        sections: [
          { article: 'Preamble', text: 'WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a [SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC] and to secure to all its citizens: JUSTICE, social, economic and political; LIBERTY of thought, expression, belief, faith and worship; EQUALITY of status and of opportunity; and to promote among them all FRATERNITY assuring the dignity of the individual and the [unity and integrity of the Nation]; IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.' }
        ]
      },
      'Chapter 1 (Part I)': {
        title: 'The Union and its Territory (Articles 1-4)',
        startArticle: '1',
        endArticle: '4',
        sections: [
          { article: '1', text: 'Name and territory of the Union. (1) India, that is Bharat, shall be a Union of States. [(2) The States and the territories thereof shall be as specified in the First Schedule.] (3) The territory of India shall comprise- (a) the territories of the States; 2[(b) the Union territories specified in the First Schedule; (c) such other territories as may be acquired.' },
          { article: '2', text: 'Admission or establishment of new States. Parliament may by law admit into the Union, or establish, new States on such terms and conditions as it thinks fit. [2A. [Sikkim to be associated with the Union.]. Omitted by the Constitution (Thirty-sixth Amendment) Act, 1975, s. 5 (w.e.f. 26-4-1975).]' },
          { article: '3', text: 'Formation of new States and alteration of areas, boundaries or names of existing States. Parliament may by law— (a) form a new State by separation of territory from any State or by uniting two or more States or parts of States or by uniting any territory to a part of any State; (b) increase the area of any State; (c) diminish the area of any State; (d) alter the boundaries of any State; (e) alter the name of any State: [Provided that no Bill for the purpose shall be introduced in either House of Parliament except on the recommendation of the President and unless, where the proposal contained in the Bill affects the area, boundaries or name of any of the States 2***, the Bill has been referred by the President to the Legislature of that State for expressing its views thereon within such period as may be specified in the reference or within such further period as the President may allow and the period so specified or allowed has expired.] [Explanation I. In this article, in clauses (a) to (e), "State" includes a Union territory, but in the proviso, "State" does not include a Union territory. Explanation II. The power conferred on Parliament by clause (a) includes the power to form a new State or Union territory by uniting a part of any State or Union territory to any any other State or Union territory.]' },
          { article: '4', text: 'Laws made under articles 2 and 3 to provide for the amendment of the First and the Fourth Schedules and supplemental, incidental and consequential matters. (1) Any law referred to in article 2 or article 3 shall contain such provisions for the amendment of the First Schedule and the Fourth Schedule as may be necessary to give effect to the provisions of the law and may also contain such supplemental, incidental and consequential provisions (including provisions as to representation in Parliament and in the Legislature or Legislatures of the State or States affected by such law) as Parliament may deem necessary. (2) No such law as aforesaid shall be deemed to be an amendment of this Constitution for the purposes of article 368.' },
        ]
      }
    }
  },
  'PART II': {
    title: 'CITIZENSHIP (Articles 5-11)',
    chapters: {
      'Chapter 1 (Part II)': {
        title: 'Citizenship',
        startArticle: '5',
        endArticle: '11',
        sections: [
          { article: '5', text: 'Citizenship at the commencement of the Constitution. At the commencement of this Constitution, every person who has his domicile in the territory of India and- (a) who was born in the territory of India; or (b) either of whose parents was born in the territory of India; or (c) who has been ordinarily resident in the territory of India for not less than five years immediately preceding such commencement, shall be a citizen of India.' },
          { article: '6', text: 'Rights of citizenship of certain persons who have migrated to India from Pakistan. Notwithstanding anything in article 5, a person who has migrated to the territory of India from the territory now included in Pakistan shall be deemed to be a citizen of India at the commencement of this Constitution if- (a) he or either of his parents or any of his grand-parents was born in India as defined in the Government of India Act, 1935 (as originally enacted); and (b)(i) in the case where such person has so migrated before the nineteenth day of July, 1948, he has been ordinarily resident in the territory of India since the date of his migration, or (ii) in the case where such person has so migrated on or after the nineteenth day of July, 1948, he has been registered as a citizen of India by an officer appointed in that behalf by the Government of the Dominion of India on an application made by him therefor to such officer before the commencement of this Constitution in the form and manner prescribed by that Government: Provided that no person shall be so registered unless he has been resident in the territory of India for at least six months immediately preceding the date of his application.' },
          { article: '7', text: 'Rights of citizenship of certain migrants to Pakistan.- Notwithstanding anything in articles 5 and 6, a person who has after the first day of March, 1947, migrated from the territory of India to the territory now included in Pakistan shall not be deemed to be a citizen of India: Provided that nothing in this article shall apply to a person who, after having so migrated to the territory now included in Pakistan, has returned to the territory of India under a permit for resettlement or permanent return issued by or under the authority of any law and every such person shall for the purposes of clause (b) of article 6 be deemed to have migrated to the territory of India after the nineteenth day of July, 1948.' },
          { article: '8', text: 'Rights of citizenship of certain persons of Indian origin residing outside India. Notwithstanding anything in article 5, any person who or either of whose parents or any of whose grand-parents was born in India as defined in the Government of India Act, 1935 (as originally enacted), and who is ordinarily residing in any country outside India as so defined shall be deemed to be a citizen of India if he has been registered as a citizen of India by the diplomatic or consular representative of India in the country where he is for the time being residing on an application made by him therefor to such diplomatic or consular representative, whether before or after the commencement of this Constitution, in the form and manner prescribed by the Government of the Dominion of India or the Government of India.' },
          { article: '9', text: 'Persons voluntarily acquiring citizenship of a foreign State not to be citizens. No person shall be a citizen of India by virtue of article 5, or be deemed to be a citizen of India by virtue of article 6 or article 8, if he has voluntarily acquired the citizenship of any foreign State.' },
          { article: '10', text: 'Continuance of the rights of citizenship. Every person who is or is deemed to be a citizen of India under any of the foregoing provisions of this Part shall, subject to the provisions of any law that may be made by Parliament, continue to be such citizen.' },
          { article: '11', text: 'Parliament to regulate the right of citizenship by law. Nothing in the foregoing provisions of this Part shall derogate from the power of Parliament to make any provision with respect to the acquisition and termination of citizenship and all other matters relating to citizenship.' },
        ]
      }
    }
  },
  'PART III': {
    title: 'FUNDAMENTAL RIGHTS (Articles 12-35)',
    chapters: {
      'General (Part III)': {
        title: 'General (Articles 12-13)',
        startArticle: '12',
        endArticle: '13',
        sections: [
          { article: '12', text: 'Definition. In this Part, unless the context otherwise requires, "the State" includes the Government and Parliament of India and the Government and the Legislature of each of the States and all local or other authorities within the territory of India or under the control of the Government of India.' },
          { article: '13', text: 'Laws inconsistent with or in derogation of the fundamental rights. (1) All laws in force in the territory of India immediately before the commencement of this Constitution, in so far as they are inconsistent with the provisions of this Part, shall, to the extent of such inconsistency, be void. (2) The State shall not make any law which takes away or abridges the rights conferred by this Part and any law made in contravention of this clause shall, to the extent of the contravention, be void. (3) In this article, unless the context otherwise requires,- (a) "law" includes any Ordinance, order, bye-law, rule, regulation, notification, custom or usage having in the territory of India the force of law; (b) "laws in force" includes laws passed or made by a Legislature or other competent authority in the territory of India before the commencement of this Constitution and not previously repealed, notwithstanding that any such law or any part thereof may not be then in operation either at all or in particular areas. [(4) Nothing in this article shall apply to any amendment of this Constitution made under article 368.]' },
        ]
      },
      'Right to Equality (Part III)': {
        title: 'Right to Equality (Articles 14-18)',
        startArticle: '14',
        endArticle: '18',
        sections: [
          { article: '14', text: 'Equality before law. The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.' },
          { article: '15', text: 'Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth.(1) The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them. (2) No citizen shall, on grounds only of religion, race, caste, sex, place of birth or any of them, be subject to any disability, liability, restriction or condition with regard to- (a) access to shops, public restaurants, hotels and places of public entertainment; or (b) the use of wells, tanks, bathing ghats, roads and places of public resort maintained wholly or partly out of State funds or dedicated to the use of the general public. (3) Nothing in this article shall prevent the State from making any special provision for women and children. [(4) Nothing in this article or in clause (2) of article 29 shall prevent the State from making any special provision for the advancement of any socially and educationally backward classes of citizens or for the Scheduled Castes and the Scheduled Tribes.] [ (5) Nothing in this article or in sub-clause (g) of clause (1) of article 19 shall prevent the State from making any special provision, by law, for the advancement of any socially and educationally backward classes of citizens or for the Scheduled Castes or the Scheduled Tribes in so far as such special provisions relate to their admission to educational institutions including private educational institutions, whether aided or unaided by the State, other than the minority educational institutions referred to in clause (1) of article 30.] [ (6) Nothing in this article or sub-clause (g) of clause (1) of article 19 or clause (2) of article 29 shall prevent the State from making.- (a) any special provision for the advancement of any economically weaker sections of citizens other than the classes mentioned in clauses (4) and (5); and (b) any special provision for the advancement of any economically weaker sections of citizens other than the classes mentioned in clauses (4) and (5) in so far as such special provisions relate to their admission to educational institutions including private educational institutions, whether aided or unaided by the State, other than the minority educational institutions referred to in clause (1) of article 30, which in the case of reservation would be in addition to the existing reservations and subject to a maximum of ten per cent. of the total seats in each category. Explanation. For the purposes of this article and article 16, "economically weaker sections" shall be such as may be notified by the State from time to time on the basis of family income and other indicators of economic disadvantage.]' },
          { article: '16', text: 'Equality of opportunity in matters of public employment. (1) There shall be equality of opportunity for all citizens in matters relating to employment or appointment to any office under the State. (2) No citizen shall, on grounds only of religion, race, caste, sex, descent, place of birth, residence or any of them, be ineligible for, or discriminated against in respect of, any employment or office under the State. (3) Nothing in this article shall prevent Parliament from making any law prescribing, in regard to a class or classes of employment or appointment to an office [under the Government of, or any local or other authority within, a State or Union territory, any requirement as to residence within that State or Union territory] prior to such employment or appointment. (4) Nothing in this article shall prevent the State from making any provision for the reservation of appointments or posts in favour of any backward class of citizens which, in the opinion of the State, is not adequately represented in the services under the State. (4A) Nothing in this article shall prevent the State from making any provision for reservation [in matters of promotion, with consequential seniority, to any class] or classes of posts in the services under the State in favour of the Scheduled Castes and the Scheduled Tribes which, in the opinion of the State, are not adequately represented in the services under the State.] [(4B) Nothing in this article shall prevent the State from considering any unfilled vacancies of a year which are reserved for being filled up in that year in accordance with any provision for reservation made under clause (4) or clause (4A) as a separate class of vacancies to be filled up in any succeeding year or years and such class of vacancies shall not be considered together with the vacancies of the year in which they are being filled up for determining the ceiling of fifty per cent. reservation on total number of vacancies of that year.] (5) Nothing in this article shall affect the operation of any law which provides that the incumbent of an office in connection with the affairs of any religious or denominational institution or any member of the governing body thereof shall be a person professing a particular religion or belonging to a particular denomination. [ (6) Nothing in this article shall prevent the State from making any provision for the reservation of appointments or posts in favour of any economically weaker sections of citizens other than the classes mentioned in clause (4), in addition to the existing reservation and subject to a maximum of ten per cent. of the posts in each category.]' },
          { article: '17', text: 'Abolition of Untouchability. "Untouchability" is abolished and its practice in any form is forbidden. The enforcement of any disability arising out of "Untouchability" shall be an offence punishable in accordance with law.' },
          { article: '18', text: 'Abolition of titles. (1) No title, not being a military or academic distinction, shall be conferred by the State. (2) No citizen of India shall accept any title from any foreign State. (3) No person who is not a citizen of India shall, while he holds any office of profit or trust under the State, accept without the consent of the President any title from any foreign State. (4) No person holding any office of profit or trust under the State shall, without the consent of the President, accept any present, emolument, or office of any kind from or under any foreign State.' },
        ]
      },
      'Right to Freedom (Part III)': {
        title: 'Right to Freedom (Articles 19-22)',
        startArticle: '19',
        endArticle: '22',
        sections: [
          { article: '19', text: 'Protection of certain rights regarding freedom of speech, etc.- (1) All citizens shall have the right- (a) to freedom of speech and expression; (b) to assemble peaceably and without arms; (c) to form associations or unions [or co-operative societies]; (d) to move freely throughout the territory of India; (e) to reside and settle in any part of the territory of India; [and] (g) to practise any profession, or to carry on any occupation, trade or business. [(2) Nothing in sub-clause (a) of clause (1) shall affect the operation of any existing law, or prevent the State from making any law, in so far as such law imposes reasonable restrictions on the exercise of the right conferred by the said sub-clause in the interests of [the sovereignty and integrity of India], the security of the State, friendly relations with foreign States, public order, decency or morality, or in relation to contempt of court, defamation or incitement to an offence.] (3) Nothing in sub-clause (b) of the said clause shall affect the operation of any existing law in so far as it imposes, or prevent the State from making any law imposing, in the interests of [the sovereignty and integrity of India or] public order, reasonable restrictions on the exercise of the right conferred by the said sub-clause. (4) Nothing in sub-clause (c) of the said clause shall affect the operation of any existing law in so far as it imposes, or prevent the State from making any law imposing, in the interests of [the sovereignty and integrity of India or] public order or morality, reasonable restrictions on the exercise of the right conferred by the said sub-clause. (5) Nothing in [sub-clauses (d) and (e)] of the said clause shall affect the operation of any existing law in so far as it imposes, or prevent the State from making any law imposing, reasonable restrictions on the exercise of any of the rights conferred by the said sub-clauses either in the interests of the general public or for the protection of the interests of any Scheduled Tribe.. (6) Nothing in sub-clause (g) of the said clause shall affect the operation of any existing law in so far as it imposes, or prevent the State from making any law imposing, in the interests of the general public, reasonable restrictions on the exercise of the right conferred by the said sub-clause, and, in particular, [nothing in the said sub-clause shall affect the operation of any existing law in so far as it relates to, or prevent the State from making any law relating to,- (i) the professional or technical qualifications necessary for practising any profession or carrying on any occupation, trade or business, or (ii) the carrying on by the State, or by a corporation owned or controlled by the State, of any trade, business, industry or service, whether to the exclusion, complete or partial, of citizens or otherwise.]' },
          { article: '20', text: 'Protection in respect of conviction for offences. (1) No person shall be convicted of any offence except for violation of a law in force at the time of the commission of the Act charged as an offence, nor be subjected to a penalty greater than that which might have been inflicted under the law in force at the time of the commission of the offence. (2) No person shall be prosecuted and punished for the same offence more than once. (3) No person accused of any offence shall be compelled to be a witness against himself.' },
          { article: '21', text: 'Protection of life and personal liberty. No person shall be deprived of his life or personal liberty except according to procedure established by law.' },
          { article: '21A', text: 'Right to education. The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may, by law, determine.' },
          { article: '22', text: 'Protection against arrest and detention in certain cases. (1) No person who is arrested shall be detained in custody without being informed, as soon as may be, of the grounds for such arrest nor shall he be denied the right to consult, and to be defended by, a legal practitioner of his choice. (2) Every person who is arrested and detained in custody shall be produced before the nearest magistrate within a period of twenty-four hours of such arrest excluding the time necessary for the journey from the place of arrest to the court of the magistrate and no such person shall be detained in custody beyond the said period without the authority of a magistrate. (3) Nothing in clauses (1) and (2) shall apply- (a) to any person who for the time being is an enemy alien; or (b) to any person who is arrested or detained under any law providing for preventive detention.' },
        ]
      },
      'Right against Exploitation (Part III)': {
        title: 'Right against Exploitation (Articles 23-24)',
        startArticle: '23',
        endArticle: '24',
        sections: [
          { article: '23', text: 'Prohibition of traffic in human beings and forced labour. (1) Traffic in human beings and begar and other similar forms of forced labour are prohibited and any contravention of this provision shall be an offence punishable in accordance with law. (2) Nothing in this article shall prevent the State from imposing compulsory service for public purposes, and in imposing such service the State shall not make any discrimination on grounds only of religion, race, caste or class or any of them.' },
          { article: '24', text: 'Prohibition of employment of children in factories, etc. No child below the age of fourteen years shall be employed to work in any factory or mine or engaged in any other hazardous employment.' },
        ]
      },
      'Right to Freedom of Religion (Part III)': {
        title: 'Right to Freedom of Religion (Articles 25-28)',
        startArticle: '25',
        endArticle: '28',
        sections: [
          { article: '25', text: 'Freedom of conscience and free profession, practice and propagation of religion. (1) Subject to public order, morality and health and to the other provisions of this Part, all persons are equally entitled to freedom of conscience and the right freely to profess, practice and propagate religion. (2) Nothing in this article shall affect the operation of any existing law or prevent the State from making any law- (a) regulating or restricting any economic, financial, political or other secular activity which may be associated with religious practice; (b) providing for social welfare and reform or the throwing open of Hindu religious institutions of a public character to all classes and sections of Hindus. Explanation I-The wearing and carrying of kirpans shall be deemed to be included in the profession of the Sikh religion. Explanation II. In sub-clause (b) of clause (2), the reference to Hindus shall be construed as including a reference to persons professing the Sikh, Jaina or Buddhist religion, and the reference to Hindu religious institutions shall be construed accordingly.' },
          { article: '26', text: 'Freedom to manage religious affairs. Subject to public order, morality and health, every religious denomination or any section thereof shall have the right- (a) to establish and maintain institutions for religious and charitable purposes; (b) to manage its own affairs in matters of religion; (c) to own and acquire movable and immovable property; and (d) to administer such property in accordance with law.' },
          { article: '27', text: 'Freedom as to payment of taxes for promotion of any particular religion. No person shall be compelled to pay any taxes, the proceeds of which are specifically appropriated in payment of expenses for the promotion or maintenance of any particular religion or religious denomination.' },
          { article: '28', text: 'Freedom as to attendance at religious instruction or religious worship in certain educational institutions.(1) No religious instruction shall be provided in any educational institution wholly maintained out of State funds. (2) Nothing in clause (1) shall apply to an educational institution which is administered by the State but has been established under any endowment or trust which requires that religious instruction shall be imparted in such institution. (3) No person attending any educational institution recognised by the State or receiving aid out of State funds shall be required to take part in any religious instruction that may be imparted in such institution or to attend any religious worship that may be conducted in such institution or in any premises attached thereto unless such person or, if such person is a minor, his guardian has given his consent thereto.' },
        ]
      },
      'Cultural and Educational Rights (Part III)': {
        title: 'Cultural and Educational Rights (Articles 29-30)',
        startArticle: '29',
        endArticle: '30',
        sections: [
          { article: '29', text: 'Protection of interests of minorities. (1) Any section of the citizens residing in the territory of India or any part thereof having a distinct language, script or culture of its own shall have the right to conserve the same. (2) No citizen shall be denied admission into any educational institution maintained by the State or receiving aid out of State funds on grounds only of religion, race, caste, language or any of them.' },
          { article: '30', text: 'Right of minorities to establish and administer educational institutions.(1) All minorities, whether based on religion or language, shall have the right to establish and administer educational institutions of their choice. [(1A) In making any law providing for the compulsory acquisition of any property of an educational institution established and administered by a minority, referred to in clause (1), the State shall ensure that the amount fixed by or determined under such law for the acquisition of such property is such as would not restrict or abrogate the right guaranteed under that clause.] (2) The State shall not, in granting aid to educational institutions, discriminate against any educational institution on the ground that it is under the management of a minority, whether based on religion or language. 31. [Compulsory acquisition of property.]. Omitted by the Constitution (Forty-fourth Amendment) Act, 1978, s. 6 (w.e.f. 20-6-1979).' },
        ]
      },
      'Saving of Certain Laws (Part III)': {
        title: 'Saving of Certain Laws (Articles 31A-31C)',
        startArticle: '31A',
        endArticle: '31C',
        sections: [
          { article: '31A', text: 'Saving of laws providing for acquisition of estates, etc.- [(1) Notwithstanding anything contained in article 13, no law providing for- (a) the acquisition by the State of any estate or of any rights therein or the extinguishment or modification of any such rights, or (b) the taking over of the management of any property by the State for a limited period either in the public interest or in order to secure the proper management of the property, or (c) the amalgamation of two or more corporations either in the public interest or in order to secure the proper management of any of the corporations, or (d) the extinguishment or modification of any rights of managing agents, secretaries and treasurers, managing directors, directors or managers of corporations, or of any voting rights of shareholders thereof, or (e) the extinguishment or modification of any rights accruing by virtue of any agreement, lease or licence for the purpose of searching for, or winning, any mineral or mineral oil, or the premature termination or cancellation of any such agreement, lease or licence, shall be deemed to be void on the ground that it is inconsistent with, or takes away or abridges any of the rights conferred by [article 14 or article 19]: Provided that where such law is a law made by the Legislature of a State, the provisions of this article shall not apply thereto unless such law, having been reserved for the consideration of the President, has received his assent:]' },
          { article: '31B', text: 'Validation of certain Acts and Regulations. Without prejudice to the generality of the provisions contained in article 31A, none of the Acts and Regulations specified in the Ninth Schedule nor any of the provisions thereof shall be deemed to be void, or ever to have become void, on the ground that such Act, Regulation or provision is inconsistent with, or takes away or abridges any of the rights conferred by, any provisions of this Part, and notwithstanding any judgment, decree or order of any court or Tribunal to the contrary, each of the said Acts and Regulations shall, subject to the power of any competent Legislature to repeal or amend it, continue in force.]' },
          { article: '31C', text: 'Saving of laws giving effect to certain directive principles.- Notwithstanding anything contained in article 13, no law giving effect to the policy of the State towards securing [all or any of the principles laid down in Part IV] shall be deemed to be void on the ground that it is inconsistent with, or takes away or abridges any of the rights conferred by [article 14 or article 19;] and no law containing a declaration that it is for giving effect to such policy shall be called in question in any court on the ground that it does not give effect to such policy]: Provided that where such law is made by the Legislature of a State, the provisions of this article shall not apply thereto unless such law, having been reserved for the consideration of the President, has received his assent.] 31D. [Saving of laws in respect of anti-national activities.]. Omitted by the Constitution (Forty-third Amendment) Act, 1977, s. 2 (w.e.f.13-4-1978).' },
        ]
      },
      'Right to Constitutional Remedies (Part III)': {
        title: 'Right to Constitutional Remedies (Articles 32-35)',
        startArticle: '32',
        endArticle: '35',
        sections: [
          { article: '32', text: 'Remedies for enforcement of rights conferred by this Part.-(1) The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed. (2) The Supreme Court shall have power to issue directions or orders or writs, including writs in the nature of habeas corpus, mandamus, prohibition, quo warranto and certiorari, whichever may be appropriate, for the enforcement of any of the rights conferred by this Part. (3) Without prejudice to the powers conferred on the Supreme Court by clauses (1) and (2), Parliament may by law empower any other court to exercise within the local limits of its jurisdiction all or any of the powers exercisable by the Supreme Court under clause (2). (4) The right guaranteed by this article shall not be suspended except as otherwise provided for by this Constitution. 32A. [Constitutional validity of State laws not to be considered in proceedings under article 32.]. Omitted by the Constitution (Forty-third Amendment) Act, 1977, s. 3 (w.e.f. 13-4-1978).' },
          { article: '33', text: 'Power of Parliament to modify the rights conferred by this Part in their application to Forces, etc. Parliament may, by law, determine to what extent any of the rights conferred by this Part shall, in their application to, (a) the members of the Armed Forces; or (b) the members of the Forces charged with the maintenance of public order; or (c) persons employed in any bureau or other organisation established by the State for purposes of intelligence or counter intelligence; or (d) person employed in, or in connection with, the telecommunication systems set up for the purposes of any Force, bureau or organisation referred to in clauses (a) to (c), be restricted or abrogated so as to ensure the proper discharge of their duties and the maintenance of discipline among them.]' },
          { article: '34', text: 'Restriction on rights conferred by this Part while martial law is in force in any area. Notwithstanding anything in the foregoing provisions of this Part, Parliament may by law indemnify any person in the service of the Union or of a State or any other person in respect of any act done by him in connection with the maintenance or restoration of order in any area within the territory of India where martial law was in force or validate any sentence passed, punishment inflicted, forfeiture ordered or other act done under martial law in such area.' },
          { article: '35', text: 'Legislation to give effect to the provisions of this Part.- Notwithstanding anything in this Constitution,- (a) Parliament shall have, and the Legislature of a State shall not have, power to make laws- (i) with respect to any of the matters which under clause (3) of article 16, clause (3) of article 32, article 33 and article 34 may be provided for by law made by Parliament; and (ii) for prescribing punishment for those acts which are declared to be offences under this Part, and Parliament shall, as soon as may be after the commencement of this Constitution, make laws for prescribing punishment for the acts referred to in sub-clause (ii); (b) any law in force immediately before the commencement of this Constitution in the territory of India with respect to any of the matters referred to in sub-clause (1) of clause (a) or providing for punishment for any act referred to in sub-clause (ii) of that clause shall, subject to the terms thereof and to any adaptations and modifications that may be made therein under article 372, continue in force until altered or repealed or amended by Parliament. Explanation. In this article, the expression "law in force" has the same meaning as in article 372.' },
        ]
      },
    }
  },
  'PART IV': {
    title: 'DIRECTIVE PRINCIPLES OF STATE POLICY (Articles 36-51)',
    chapters: {
      'General (Part IV)': {
        title: 'General (Articles 36-37)',
        startArticle: '36',
        endArticle: '37',
        sections: [
          { article: '36', text: 'Definition. In this Part, unless the context otherwise requires, "the State" has the same meaning as in Part III.' },
          { article: '37', text: 'Application of the principles contained in this Part. The provisions contained in this Part shall not be enforceable by any court, but the principles therein laid down are nevertheless fundamental in the governance of the country and it shall be the duty of the State to apply these principles in making laws.' },
        ]
      },
      'Socio-Economic Principles (Part IV)': {
        title: 'Socio-Economic Principles (Articles 38-39A)',
        startArticle: '38',
        endArticle: '39A',
        sections: [
          { article: '38', text: 'State to secure a social order for the promotion of welfare of the people.[(1)] The State shall strive to promote the welfare of the people by securing and protecting as effectively as it may a social order in which justice, social, economic and political, shall inform all the institutions of the national life. [(2) The State shall, in particular, strive to minimise the inequalities in income, and endeavour to eliminate inequalities in status, facilities and opportunities, not only amongst individuals but also amongst groups of people residing in different areas or engaged in different vocations.]' },
          { article: '39', text: 'Certain principles of policy to be followed by the State. The State shall, in particular, direct its policy towards securing- (a) that the citizens, men and women equally, have the right to an adequate means of livelihood; (b) that the ownership and control of the material resources of the community are so distributed as best to subserve the common good; (c) that the operation of the economic system does not result in the concentration of wealth and means of production to the common detriment: (d) that there is equal pay for equal work for both men and women; (e) that the health and strength of workers, men and women, and the tender age of children are not abused and that citizens are not forced by economic necessity to enter avocations unsuited to their age or strength; (f) that children are given opportunities and facilities to develop in a healthy manner and in conditions of freedom and dignity and that childhood and youth are protected against exploitation and against moral and material abandonment.' },
          { article: '39A', text: 'Equal justice and free legal aid. The State shall secure that the operation of the legal system promotes justice, on a basis of equal opportunity, and shall, in particular, provide free legal aid, by suitable legislation or schemes or in any other way, to ensure that opportunities for securing justice are not denied to any citizen by reason of economic or other disabilities.' },
        ]
      },
      'Gandhian & Liberal Principles (Part IV)': {
        title: 'Gandhian & Liberal Principles (Articles 40-51)',
        startArticle: '40',
        endArticle: '51',
        sections: [
          { article: '40', text: 'Organisation of village panchayats. The State shall take steps to organise village panchayats and endow them with such powers and authority as may be necessary to enable them to function as units of self-government.' },
          { article: '41', text: 'Right to work, to education and to public assistance in certain cases. The State shall, within the limits of its economic capacity and development, make effective provision for securing the right to work, to education and to public assistance in cases of unemployment, old age, sickness and disablement, and in other cases of undeserved want.' },
          { article: '42', text: 'Provision for just and humane conditions of work and maternity relief. The State shall make provision for securing just and humane conditions of work and for maternity relief.' },
          { article: '43', text: 'Living wage, etc., for workers. The State shall endeavour to secure, by suitable legislation or economic organisation or in any other way, to all workers, agricultural, industrial or otherwise, work, a living wage, conditions of work ensuring a decent standard of life and full enjoyment of leisure and social and cultural opportunities and, in particular, the State shall endeavour to promote cottage industries on an individual or co-operative basis in rural areas. [43A. Participation of workers in management of industries. The State shall take steps, by suitable legislation or in any other way, to secure the participation of workers in the management of undertakings, establishments or other organisations engaged in any industry.] [43B. Promotion of co-operative societies. The State shall endeavour to promote voluntary formation, autonomous functioning, democratic control and professional management of co-operative societies.]' },
          { article: '44', text: 'Uniform civil code for the citizens. The State shall endeavour to secure for the citizens a uniform civil code throughout the territory of India.' },
          { article: '45', text: 'Provision for early childhood care and education to children below the age of six years. The State shall endeavour to provide early childhood care and education for all children until they complete the age of six years.' },
          { article: '46', text: 'Promotion of educational and economic interests of Scheduled Castes, Scheduled Tribes and other weaker sections. The State shall promote with special care the educational and economic interests of the weaker sections of the people, and, in particular, of the Scheduled Castes and the Scheduled Tribes, and shall protect them from social injustice and all forms of exploitation.' },
          { article: '47', text: 'Duty of the State to raise the level of nutrition and the standard of living and to improve public health. The State shall regard the raising of the level of nutrition and the standard of living of its people and the improvement of public health as among its primary duties and, in particular, the State shall endeavour to bring about prohibition of the consumption except for medicinal purposes of intoxicating drinks and of drugs which are injurious to health.' },
          { article: '48', text: 'Organisation of agriculture and animal husbandry. The State shall endeavour to organise agriculture and animal husbandry on modern and scientific lines and shall, in particular, take steps for preserving and improving the breeds, and prohibiting the slaughter, of cows and calves and other milch and draught cattle. [48A. Protection and improvement of environment and safeguarding of forests and wild life. The State shall endeavour to protect and improve the environment and to safeguard the forests and wild life of the country.]' },
          { article: '49', text: 'Protection of monuments and places and objects of national importance. It shall be the obligation of the State to protect every monument or place or object of artistic or historic interest, [declared by or under law made by Parliament] to be of national importance, from spoliation, disfigurement, destruction, removal, disposal or export, as the case may be.' },
          { article: '50', text: 'Separation of judiciary from executive. The State shall take steps to separate the judiciary from the executive in the public services of the State.' },
          { article: '51', text: 'Promotion of international peace and security. The State shall endeavour to- (a) promote international peace and security; (b) maintain just and honourable relations between nations; (c) foster respect for international law and treaty obligations in the dealings of organised peoples with one another, and (d) encourage settlement of international disputes by arbitration.' },
        ]
      },
    }
  },
  'PART IVA': {
    title: 'FUNDAMENTAL DUTIES (Article 51A)',
    chapters: {
      'Chapter 1 (Part IVA)': {
        title: 'Fundamental Duties',
        startArticle: '51A',
        endArticle: '51A',
        sections: [
          { article: '51A', text: 'Fundamental duties. It shall be the duty of every citizen of India- (a) to abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem; (b) to cherish and follow the noble ideals which inspired our national struggle for freedom; (c) to uphold and protect the sovereignty, unity and integrity of India: (d) to defend the country and render national service when called upon to do so; (e) to promote harmony and the spirit of common brotherhood amongst all the people of India transcending religious, linguistic and regional or sectional diversities; to renounce practices derogatory to the dignity of women; (f) to value and preserve the rich heritage of our composite culture; (g) to protect and improve the natural environment including forests, lakes, rivers and wild life, and to have compassion for living creatures: (h) to develop the scientific temper, humanism and the spirit of inquiry and reform; (i) to safeguard public property and to abjure violence; (j) to strive towards excellence in all spheres of individual and collective activity so that the nation constantly rises to higher levels of endeavour and achievement; ] [(k) who is a parent or guardian to provide opportunities for education to his child or, as the case may be, ward between the age of six and fourteen years.]' },
        ]
      }
    }
  },
  'PART V': {
    title: 'THE UNION (Articles 52-151)',
    chapters: {
      'The Executive (Part V)': {
        title: 'Chapter I - The Executive (Articles 52-78)',
        startArticle: '52',
        endArticle: '78',
        sections: [
          { article: '52', text: 'The President of India. There shall be a President of India.' },
          { article: '53', text: 'Executive power of the Union. (1) The executive power of the Union shall be vested in the President and shall be exercised by him either directly or through officers subordinate to him in accordance with this Constitution. (2) Without prejudice to the generality of the foregoing provision, the supreme command of the Defence Forces of the Union shall be vested in the President and the exercise thereof shall be regulated by law. (3) Nothing in this article shall- (a) be deemed to transfer to the President any functions conferred by any existing law on the Government of any State or other authority; or (b) prevent Parliament from conferring by law functions on authorities other than the President.' },
          { article: '54', text: 'Election of President. The President shall be elected by the members of an electoral college consisting of- (a) the elected members of both Houses of Parliament; and (b) the elected members of the Legislative Assemblies of the States. [Explanation. In this article and in article 55, "State" includes the National Capital Territory of Delhi and the Union territory of Pondicherry.]' },
          { article: '74', text: 'Council of Ministers to aid and advise President. [(1) There shall be a Council of Ministers with the Prime Minister at the head to aid and advise the President who shall, in the exercise of his functions, act in accordance with such advice:] [Provided that the President may require the Council of Ministers to reconsider such advice, either generally or otherwise, and the President shall act in accordance with the advice tendered after such reconsideration.] (2) The question whether any, and if so what, advice was tendered by Ministers to the President shall not be inquired into in any court.' },
          { article: '76', text: 'Attorney-General for India. (1) The President shall appoint a person who is qualified to be appointed a Judge of the Supreme Court to be Attorney-General for India. (2) It shall be the duty of the Attorney-General to give advice to the Government of India upon such legal matters, and to perform such other duties of a legal character, as may from time to time be referred or assigned to him by the President, and to discharge the functions conferred on him by or under this Constitution or any other law for the time being in force. (3) In the performance of his duties the Attorney-General shall have right of audience in all courts in the territory of India. (4) The Attorney-General shall hold office during the pleasure of the President, and shall receive such remuneration as the President may determine.' },
          { article: '78', text: 'Duties of Prime Minister as respects the furnishing of information to the President, etc. It shall be the duty of the Prime Minister- (a) to communicate to the President all decisions of the Council of Ministers relating to the administration of the affairs of the Union and proposals for legislation; (b) to furnish such information relating to the administration of the affairs of the Union and proposals for legislation as the President may call for; and (c) if the President so requires, to submit for the consideration of the Council of Ministers any matter on which a decision has been taken by a Minister but which has not been considered by the Council.' },
        ]
      },
      'Parliament (Part V)': {
        title: 'Chapter II - Parliament (Articles 79-122)',
        startArticle: '79',
        endArticle: '122',
        sections: [
          { article: '79', text: 'Constitution of Parliament. There shall be a Parliament for the Union which shall consist of the President and two Houses to be known respectively as the Council of States and the House of the People.' },
          { article: '80', text: 'Composition of the Council of States. (1) The Council of States shall consist of- (a) twelve members to be nominated by the President in accordance with the provisions of clause (3); and (b) not more than two hundred and thirty-eight representatives of the States [and of the Union territories]. (2) The allocation of seats in the Council of States to be filled by representatives of the States [and of the Union territories] shall be in accordance with the provisions in that behalf contained in the Fourth Schedule. (3) The members to be nominated by the President under sub-clause (a) of clause (1) shall consist of persons having special knowledge or practical experience in respect of such matters as the following, namely:- Literature, science, art and social service.' },
          { article: '81', text: 'Composition of the House of the People. (1) [Subject to the provisions of article 331], the House of the People shall consist of- (a) not more than [five hundred and thirty members] chosen by direct election from territorial constituencies in the States, and (b) not more than [twenty members] to represent the Union territories, chosen in such manner as Parliament may by law provide. (2) For the purposes of sub-clause (a) of clause (1),- (a) there shall be allotted to each State a number of seats in the House of the People in such manner that the ratio between that number and the population of the State is, so far as practicable, the same for all States; and (b) each State shall be divided into territorial constituencies in such manner that the ratio between the population of each constituency and the number of seats allotted to it is, so far as practicable, the same throughout the State: [Provided that the provisions of sub-clause (a) of this clause shall not be applicable for the purpose of allotment of seats in the House of the People to any State so long as the population of that State does not exceed six millions.]' },
          { article: '83', text: 'Duration of Houses of Parliament. (1) The Council of States shall not be subject to dissolution, but as nearly as possible one-third of the members thereof shall retire as soon as may be on the expiration of every second year in accordance with the provisions made in that behalf by Parliament by law. (2) The House of the People, unless sooner dissolved, shall continue for [five years] from the date appointed for its first meeting and no longer and the expiration of the said period of [five years] shall operate as a dissolution of the House: Provided that the said period may, while a Proclamation of Emergency is in operation, be extended by Parliament by law for a period not exceeding one year at a time and not extending in any case beyond a period of six months after the Proclamation has ceased to operate.' },
          { article: '108', text: 'Joint sitting of both Houses in certain cases.(1) If after a Bill has been passed by one House and transmitted to the other House- (a) the Bill is rejected by the other House; or (b) the Houses have finally disagreed as to the amendments to be made in the Bill; or (c) more than six months elapse from the date of the reception of the Bill by the other House without the Bill being passed by it, the President may, unless the Bill has elapsed by reason of a dissolution of the House of the People, notify to the Houses by message if they are sitting or by public notification if they are not sitting, his intention to summon them to meet in a joint sitting for the purpose of deliberating and voting on the Bill: Provided that nothing in this clause shall apply to a Money Bill..' },
          { article: '110', text: 'Definition of "Money Bills". (1) For the purposes of this Chapter, a Bill shall be deemed to be a Money Bill if it contains only provisions dealing with all or any of the following matters, namely:- (a) the imposition, abolition, remission, alteration or regulation of any tax: (b) the regulation of the borrowing of money or the giving of any guarantee by the Government of India, or the amendment of the law with respect to any financial obligations undertaken or to be undertaken by the Government of India; (c) the custody of the Consolidated Fund or the Contingency Fund of India, the payment of moneys into or the withdrawal of moneys from any such Fund; (d) the appropriation of moneys out of the Consolidated Fund of India; (e) the declaring of any expenditure to be expenditure charged on the Consolidated Fund of India or the increasing of the amount of any such expenditure; (f) the receipt of money on account of the Consolidated Fund of India or the public account of India or the custody or issue of such money or the audit of the accounts of the Union or of a State; or (g) any matter incidental to any of the matters specified in sub-clauses (a) to (f). (3) If any question arises whether a Bill is a Money Bill or not, the decision of the Speaker of the House of the People thereon shall be final.' },
        ]
      },
      'Legislative Powers of the President (Part V)': {
        title: 'Chapter III - Legislative Powers of the President (Article 123)',
        startArticle: '123',
        endArticle: '123',
        sections: [
          { article: '123', text: 'Power of President to promulgate Ordinances during recess of Parliament. (1) If at any time, except when both Houses of Parliament are in session, the President is satisfied that circumstances exist which render it necessary for him to take immediate action, he may promulgate such Ordinances as the circumstances appear to him to require. (2) An Ordinance promulgated under this article shall have the same force and effect as an Act of Parliament, but every such Ordinance- (a) shall be laid before both Houses of Parliament and shall cease to operate at the expiration of six weeks from the reassembly of Parliament, or, if before the expiration of that period resolutions disapproving it are passed by both Houses, upon the passing of the second of those resolutions; and (b) may be withdrawn at any time by the President.' },
        ]
      },
      'The Union Judiciary (Part V)': {
        title: 'Chapter IV - The Union Judiciary (Articles 124-147)',
        startArticle: '124',
        endArticle: '147',
        sections: [
          { article: '124', text: 'Establishment and constitution of Supreme Court. (1) There shall be a Supreme Court of India consisting of a Chief Justice of India and, until Parliament by law prescribes a larger number, of not more than thirty-three other Judges. (2) Every Judge of the Supreme Court shall be appointed by the President by warrant under his hand and seal [on the recommendation of the National Judicial Appointments Commission referred to in article 124A] and shall hold office until he attains the age of sixty-five years: (4) A Judge of the Supreme Court shall not be removed from his office except by an order of the President passed after an address by each House of Parliament supported by a majority of the total membership of that House and by a majority of not less than two-thirds of the members of that House present and voting has been presented to the President in the same session for such removal on the ground of proved misbehaviour or incapacity.' },
          { article: '131', text: 'Original jurisdiction of the Supreme Court. Subject to the provisions of this Constitution, the Supreme Court shall, to the exclusion of any other court, have original jurisdiction in any dispute- (a) between the Government of India and one or more States; or (b) between the Government of India and any State or States on one side and one or more other States on the other; or (c) between two or more States, if and in so far as the dispute involves any question (whether of law or fact) on which the existence or extent of a legal right depends:' },
          { article: '141', text: 'Law declared by Supreme Court to be binding on all courts. The law declared by the Supreme Court shall be binding on all courts within the territory of India.' },
          { article: '142', text: 'Enforcement of decrees and orders of Supreme Court and orders as to discovery, etc. (1) The Supreme Court in the exercise of its jurisdiction may pass such decree or make such order as is necessary for doing complete justice in any cause or matter pending before it, and any decree so passed or order so made shall be enforceable throughout the territory of India in such manner as may be prescribed by or under any law made by Parliament...' },
        ]
      },
      'Comptroller and Auditor-General of India (Part V)': {
        title: 'Chapter V - Comptroller and Auditor-General of India (Articles 148-151)',
        startArticle: '148',
        endArticle: '151',
        sections: [
          { article: '148', text: 'Comptroller and Auditor-General of India. (1) There shall be a Comptroller and Auditor-General of India who shall be appointed by the President by warrant under his hand and seal and shall only be removed from office in like manner and on the like grounds as a Judge of the Supreme Court. (4) The Comptroller and Auditor-General shall not be eligible for further office either under the Government of India or under the Government of any State after he has ceased to hold his office.' },
          { article: '151', text: 'Audit reports. (1) The reports of the Comptroller and Auditor-General of India relating to the accounts of the Union shall be submitted to the President, who shall cause them to be laid before each House of Parliament. (2) The reports of the Comptroller and Auditor-General of India relating to the accounts of a State shall be submitted to the Governor *** of the State, who shall cause them to be laid before the Legislature of the State.' },
        ]
      },
    }
  },
  'PART VI': {
    title: 'THE STATES (Articles 152-237)',
    chapters: {
      'General (Part VI)': {
        title: 'Chapter I - General (Article 152)',
        startArticle: '152',
        endArticle: '152',
        sections: [
          { article: '152', text: 'Definition. In this Part, unless the context otherwise requires, the expression “State” [does not include the State of Jammu and Kashmir].' }
        ]
      },
      'The Executive (Part VI)': {
        title: 'Chapter II - The Executive (Articles 153-167)',
        startArticle: '153',
        endArticle: '167',
        sections: [
          { article: '153', text: 'Governors of States. There shall be a Governor for each State: [Provided that nothing in this article shall prevent the appointment of the same person as Governor for two or more States.]' },
          { article: '163', text: 'Council of Ministers to aid and advise Governor. (1) There shall be a Council of Ministers with the Chief Minister at the head to aid and advise the Governor in the exercise of his functions, except in so far as he is by or under this Constitution required to exercise his functions or any of them in his discretion. (2) If any question arises whether any matter is or is not a matter as respects which the Governor is by or under this Constitution required to act in his discretion, the decision of the Governor in his discretion shall be final, and the validity of anything done by the Governor shall not be called in question on the ground that he ought or ought not to have acted in his discretion. (3) The question whether any, and if so what, advice was tendered by Ministers to the Governor shall not be inquired into in any court.' }
        ]
      },
      'The State Legislature (Part VI)': {
        title: 'Chapter III - The State Legislature (Articles 168-212)',
        startArticle: '168',
        endArticle: '212',
        sections: [
          { article: '168', text: 'Constitution of Legislatures in States. (1) For every State there shall be a Legislature which shall consist of the Governor, and— (a) in the States of Andhra Pradesh, Bihar, Madhya Pradesh, Maharashtra, Karnataka, Tamil Nadu, Telangana and Uttar Pradesh, two Houses; (b) in other States, one House. (2) Where there are two Houses of the Legislature of a State, one shall be known as the Legislative Council and the other as the Legislative Assembly, and where there is only one House, it shall be known as the Legislative Assembly.' },
          { article: '169', text: 'Abolition or creation of Legislative Councils in States. (1) Notwithstanding anything in article 168, Parliament may by law provide for the abolition of the Legislative Council of a State having such a Council or for the creation of such a Council in a State having no such Council, if the Legislative Assembly of the State passes a resolution to that effect by a majority of the total membership of the Assembly and by a majority of not less than two-thirds of the members of the Assembly present and voting.' },
          { article: '202', text: 'Annual financial statement. (1) The Governor shall in respect of every financial year cause to be laid before the House or Houses of the Legislature of the State a statement of the estimated receipts and expenditure of the State for that year, in this Part referred to as the “annual financial statement”. (3) The following expenditure shall be expenditure charged on the Consolidated Fund of each State— (a) the emoluments and allowances of the Governor and other expenditure relating to his office; (d) expenditure in respect of the salaries and allowances of Judges of any High Court;' }
        ]
      },
      'Legislative Power of the Governor (Part VI)': {
        title: 'Chapter IV - Legislative Power of the Governor (Article 213)',
        startArticle: '213',
        endArticle: '213',
        sections: [
          { article: '213', text: 'Power of Governor to promulgate Ordinances during recess of Legislature. (1) If at any time, except when the Legislative Assembly of a State is in session, or where there is a Legislative Council in a State, except when both Houses of the Legislature are in session, the Governor is satisfied that circumstances exist which render it necessary for him to take immediate action, he may promulgate such Ordinances as the circumstances appear to him to require:' }
        ]
      },
      'The High Courts in the States (Part VI)': {
        title: 'Chapter V - The High Courts in the States (Articles 214-232)',
        startArticle: '214',
        endArticle: '232',
        sections: [
          { article: '214', text: 'High Courts for States. There shall be a High Court for each State.' },
          { article: '226', text: 'Power of High Courts to issue certain writs. (1) Notwithstanding anything in article 32, every High Court shall have power, throughout the territories in relation to which it exercises jurisdiction, to issue to any person or authority, including in appropriate cases, any Government, within those territories directions, orders or writs, including writs in the nature of habeas corpus, mandamus, prohibition, quo warranto and certiorari, or any of them, for the enforcement of any of the rights conferred by Part III and for any other purpose. (2) The power conferred by clause (1) to issue directions, orders or writs to any Government, authority or person may also be exercised by any High Court exercising jurisdiction in relation to the territories within which the cause of action, wholly or in part, arises for the exercise of such power, notwithstanding that the seat of such Government or authority or the residence of such person is not within those territories.' }
        ]
      },
      'Subordinate Courts (Part VI)': {
        title: 'Chapter VI - Subordinate Courts (Articles 233-237)',
        startArticle: '233',
        endArticle: '237',
        sections: [
          { article: '233', text: 'Appointment of district judges. (1) Appointments of persons to be, and the posting and promotion of, district judges in any State shall be made by the Governor of the State in consultation with the High Court exercising jurisdiction in relation to such State. (2) A person not already in the service of the Union or of the State shall only be eligible to be appointed a district judge if he has been for not less than seven years an advocate or a pleader and is recommended by the High Court for appointment.' },
          { article: '235', text: 'Control over subordinate courts. The control over district courts and courts subordinate thereto including the posting and promotion of, and the grant of leave to, persons belonging to the judicial service of a State and holding any post inferior to the post of district judge shall be vested in the High Court, but nothing in this article shall be construed as taking away from any such person any right of appeal which he may have under the law regulating the conditions of his service or as authorising the High Court to deal with him otherwise than in accordance with the conditions of his service prescribed under such law.' }
        ]
      },
    }
  },
  'PART IX': {
    title: 'THE PANCHAYATS (Articles 243-243-O)',
    chapters: {
      'Chapter 1 (Part IX)': {
        title: 'Panchayats',
        startArticle: '243',
        endArticle: '243-O',
        sections: [
          { article: '243', text: 'Definitions. In this Part, unless the context otherwise requires,— (a) “district” means a district in a State; (b) “Gram Sabha” means a body consisting of persons registered in the electoral rolls relating to a village comprised within the area of Panchayat at the village level; (d) “Panchayat” means an institution (by whatever name called) of self-government constituted under article 243B, for the rural areas; (f) “Population” means the population as ascertained at the last preceding census of which the relevant figures have been published;' },
          { article: '243B', text: 'Constitution of Panchayats. (1) There shall be constituted in every State, Panchayats at the village, intermediate and district levels in accordance with the provisions of this Part. (2) Notwithstanding anything in clause (1), Panchayats at the intermediate level may not be constituted in a State having a population not exceeding twenty lakhs.' },
          { article: '243D', text: 'Reservation of seats. (1) Seats shall be reserved for— (a) the Scheduled Castes; and (b) the Scheduled Tribes, in every Panchayat and the number of seats so reserved shall bear, as nearly as may be, the same proportion to the total number of seats to be filled by direct election... (3) Not less than one-third (including the number of seats reserved for women belonging to the Scheduled Castes and the Scheduled Tribes) of the total number of seats to be filled by direct election in every Panchayat shall be reserved for women...' },
          { article: '243K', text: 'Elections to the Panchayats. (1) The superintendence, direction and control of the preparation of electoral rolls for, and the conduct of, all elections to the Panchayats shall be vested in a State Election Commission consisting of a State Election Commissioner to be appointed by the Governor.' },
        ]
      }
    }
  },
  'PART IXA': {
    title: 'THE MUNICIPALITIES (Articles 243P-243ZG)',
    chapters: {
      'Chapter 1 (Part IXA)': {
        title: 'Municipalities',
        startArticle: '243P',
        endArticle: '243ZG',
        sections: [
          { article: '243P', text: 'Definitions. In this Part, unless the context otherwise requires,— (c) “Metropolitan area” means an area having a population of ten lakhs or more... (e) “Municipality” means an institution of self-government constituted under article 243Q;' },
          { article: '243Q', text: 'Constitution of Municipalities. (1) There shall be constituted in every State,— (a) a Nagar Panchayat (by whatever name called) for a transitional area... (b) a Municipal Council for a smaller urban area; and (c) a Municipal Corporation for a larger urban area...' },
          { article: '243W', text: 'Powers, authority and responsibilities of Municipalities, etc. Subject to the provisions of this Constitution, the Legislature of a State may, by law, endow— (a) the Municipalities with such powers and authority as may be necessary to enable them to function as institutions of self-government... (b) the Committees with such powers and authority as may be necessary to enable them to carry out the responsibilities conferred upon them including those in relation to the matters listed in the Twelfth Schedule.' },
        ]
      }
    }
  },
  'PART XII': {
    title: 'FINANCE, PROPERTY, CONTRACTS AND SUITS (Articles 264-300A)',
    chapters: {
      'Finance (Part XII)': {
        title: 'Chapter I - Finance (Articles 264-281)',
        startArticle: '264',
        endArticle: '281',
        sections: [
          { article: '265', text: 'Taxes not to be imposed save by authority of law. No tax shall be levied or collected except by authority of law.' },
          { article: '266', text: 'Consolidated Funds and public accounts of India and of the States. (1) Subject to the provisions of article 267 and to the provisions of this Chapter with respect to the assignment of the whole or part of the net proceeds of certain taxes and duties to States, all revenues received by the Government of India... shall form one consolidated fund to be entitled “the Consolidated Fund of India,” and all revenues received by the Government of a State... shall form one consolidated fund to be entitled “the Consolidated Fund of the State”.' },
          { article: '279A', text: 'Goods and Services Tax Council. (1) The President shall, within sixty days from the date of commencement of the Constitution (One Hundred and First Amendment) Act, 2016, by order, constitute a Council to be called the Goods and Services Tax Council. (9) Every decision of the Goods and Services Tax Council shall be taken at a meeting, by a majority of not less than three-fourths of the weighted votes of the members present and voting, in accordance with the following principles, namely:— (a) the vote of the Central Government shall have a weightage of one-third of the total votes cast, and (b) the votes of all the State Governments taken together shall have a weightage of two-thirds of the total votes cast, in that meeting.' },
        ]
      },
      'Right to Property (Part XII)': {
        title: 'Chapter IV - Right to Property (Article 300A)',
        startArticle: '300A',
        endArticle: '300A',
        sections: [
          { article: '300A', text: 'Persons not to be deprived of property save by authority of law. No person shall be deprived of his property save by authority of law.' },
        ]
      }
    }
  },
  'PART XX': {
    title: 'AMENDMENT OF THE CONSTITUTION (Article 368)',
    chapters: {
      'Chapter 1 (Part XX)': {
        title: 'Amendment',
        startArticle: '368',
        endArticle: '368',
        sections: [
          { article: '368', text: 'Power of Parliament to amend the Constitution and procedure therefor. (1) Notwithstanding anything in this Constitution, Parliament may in exercise of its constituent power amend by way of addition, variation or repeal any provision of this Constitution in accordance with the procedure laid down in this article. (2) An amendment of this Constitution may be initiated only by the introduction of a Bill for the purpose in either House of Parliament, and when the Bill is passed in each House by a majority of the total membership of that House and by a majority of not less than two-thirds of the members of that House present and voting, [it shall be presented to the President who shall give his assent to the Bill and thereupon] the Constitution shall stand amended in accordance with the terms of the Bill: Provided that if such amendment seeks to make any change in— (a) article 54, article 55, article 73, [ article 162, article 241 or article 279A]; or (e) the provisions of this article, the amendment shall also require to be ratified by the Legislatures of not less than one-half of the States *** by resolutions to that effect passed by those Legislatures before the Bill making provision for such amendment is presented to the President for assent.' },
        ]
      }
    }
  },
};
// --- END: PASTED CONSTITUTION CONTENT (Article Titles & Hierarchy) ---


// Helper function to extract all articles for search functionality
const getAllArticles = (data) => {
  const articles = [];
  Object.keys(data).forEach(partKey => {
    const part = data[partKey];
    Object.keys(part.chapters).forEach(chapterKey => {
      const chapter = part.chapters[chapterKey];
      chapter.sections.forEach(section => {
        articles.push({
          id: `article-${section.article}`,
          part: part.title.split('(')[0].trim(),
          chapter: chapter.title,
          article: section.article,
          text: section.text,
          searchableText: `${section.article} ${section.text}`.toLowerCase(),
        });
      });
    });
  });
  return articles;
};

// Define minimum and maximum width for the sidebar
const MIN_WIDTH = 250; // Minimum width in pixels
const MAX_WIDTH = 600; // Maximum width in pixels

// Main Constitution Viewer Component
const ConstitutionViewer = () => {
  const allArticles = useMemo(() => getAllArticles(constitutionData), []);
  const [activeArticle, setActiveArticle] = useState(allArticles[0]?.id || 'Preamble');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(300); // Initial desktop width
  const isResizing = useRef(false);

  // --- Resizing Logic ---
  const startResizing = useCallback((e) => {
    // Check for primary mouse button (0)
    if (e.button !== 0) return; 
    e.preventDefault();
    isResizing.current = true;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResizing);
  }, []);

  const resize = useCallback((e) => {
    if (!isResizing.current) return;
    const newWidth = e.clientX;
    if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
      setSidebarWidth(newWidth);
    } else if (newWidth < MIN_WIDTH) {
      setSidebarWidth(MIN_WIDTH);
    } else if (newWidth > MAX_WIDTH) {
      setSidebarWidth(MAX_WIDTH);
    }
  }, []);

  const stopResizing = useCallback(() => {
    isResizing.current = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResizing);
  }, []);
  // --- End Resizing Logic ---


  // Custom Hook to manage scrolling
  React.useEffect(() => {
    if (activeArticle && !searchTerm) {
      const element = document.getElementById(activeArticle);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (activeArticle && searchTerm) {
        const element = document.getElementById(activeArticle);
        if (element) {
            element.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }
  }, [activeArticle, searchTerm]);

  // Filtered Articles for the main content area
  const filteredArticles = useMemo(() => {
    const lowerCaseSearch = searchTerm.toLowerCase().trim();
    if (!lowerCaseSearch) return allArticles;
    
    let results = allArticles.filter(article => 
      article.searchableText.includes(lowerCaseSearch)
    );
    
    if (results.length > 0 && activeArticle !== results[0].id) {
        setActiveArticle(results[0].id);
    } else if (results.length === 0 && activeArticle !== null) {
        setActiveArticle(null);
    }
    
    return results;
  }, [searchTerm, allArticles]);

  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((segment, index) => {
      if (segment.toLowerCase() === searchTerm.toLowerCase()) {
        return <mark key={index} className="bg-amber-300 rounded-sm p-[2px]">{segment}</mark>;
      }
      return segment;
    });
  };

  const Sidebar = () => (
    // UPDATED SIDEBAR STYLES
    <div 
        // Inline style sets the adjustable width on large screens
        style={window.innerWidth >= 1024 ? { width: `${sidebarWidth}px` } : {}}
        className={`fixed top-0 left-0 h-full p-6 bg-white border-r border-gray-300 z-50 transform transition-transform duration-300 ease-in-out 
                   lg:sticky lg:top-[150px] lg:h-[calc(100vh-150px)] lg:shadow-lg lg:rounded-xl lg:flex-shrink-0 lg:z-40 
                   ${isSidebarOpen ? 'translate-x-0 shadow-2xl w-full sm:w-96' : '-translate-x-full lg:translate-x-0'} overflow-y-auto`}
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center justify-between">
        🏛️ Constitution Navigator
        
        {/* Close Button for Mobile */}
        <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="lg:hidden text-gray-500 hover:text-indigo-600 transition duration-150 p-2"
        >
            ❌
        </button>
      </h3>
      
      <nav>
        {Object.keys(constitutionData).map(partKey => {
          const part = constitutionData[partKey];
          return (
            <div key={partKey} className="mb-4">
              <h4 className="font-extrabold text-indigo-700 text-lg mb-2 cursor-pointer hover:text-indigo-900 transition duration-150 border-l-4 border-indigo-200 pl-2"
                  onClick={() => setActiveArticle(part.chapters[Object.keys(part.chapters)[0]].sections[0].id)}>
                {partKey}: {part.title.split('(')[0].trim()}
              </h4>
              {Object.keys(part.chapters).map(chapterKey => {
                const chapter = part.chapters[chapterKey];
                
                return (
                  <div key={chapterKey} className="ml-3 mb-2">
                    <h5 className="font-semibold text-gray-700 text-base mb-1 hover:text-indigo-600 cursor-pointer transition duration-150"
                        onClick={() => setActiveArticle(chapter.sections[0].id)}>
                      {chapter.title.includes('Article') ? chapter.title : `— ${chapter.title}`}
                    </h5>
                    {chapter.sections.map((section, index) => (
                      <a 
                        key={index}
                        href={`#article-${section.article}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveArticle(`article-${section.article}`);
                          setIsSidebarOpen(false); // Close sidebar after clicking link on mobile
                        }}
                        className={`block text-sm py-1 pl-2 rounded-md transition duration-150 ${
                          activeArticle === `article-${section.article}` ? 'bg-indigo-100 text-indigo-800 font-bold border-l-2 border-indigo-600' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        Art. {section.article}
                      </a>
                    ))}
                  </div>
                );
              })}
            </div>
          );
        })}
      </nav>
    </div>
  );

  const MainContent = () => (
    <div className="flex-grow p-6 bg-white rounded-xl shadow-2xl space-y-6">
      <h2 className="text-3xl font-extrabold text-indigo-800 border-b-2 border-indigo-200 pb-3 mb-6">
        The Constitution of India
      </h2>
      
      {/* Mobile Toggle Button */}
      <button 
          onClick={() => setIsSidebarOpen(true)} 
          className="lg:hidden fixed bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg z-50 hover:bg-indigo-700 transition"
      >
          Open Menu ☰
      </button>

      {/* SEARCH BAR - CHANGED TO WHITE BACKGROUND */}
      <div className="p-4 bg-white rounded-lg border-l-4 border-indigo-500 shadow-inner sticky top-[150px] z-30 mb-8 border-t border-b"> 
        <label htmlFor="article-search" className="block text-sm font-medium text-gray-700 mb-2">
          🔍 Search Constitutional Text
        </label>
        <input
          id="article-search"
          type="text"
          placeholder="Search for words, phrases, or article numbers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 bg-white"
          style={{ 
             // Optional: Darker input background inside white bar for contrast
             backgroundColor: 'white',
             color: 'black'
          }}
        />
      </div>

      {filteredArticles.length === 0 && searchTerm.length > 0 ? (
        <div className="p-8 text-center text-xl text-red-500 bg-red-50 border border-red-200 rounded-xl">
          No articles found matching your search term: **"{searchTerm}"**.
        </div>
      ) : (
        <div className="space-y-10">
          {filteredArticles.map((item, index) => (
            <div 
              key={index} 
              id={item.id} 
              className={`p-6 border rounded-xl transition duration-300 ${
                activeArticle === item.id ? 'border-indigo-600 bg-indigo-50 shadow-lg' : 'border-gray-200 hover:shadow-md'
              }`}
            >
              <span className="block text-xs font-semibold text-gray-500 mb-1 uppercase">
                {item.part}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b border-indigo-200 pb-2 flex justify-between items-center">
                <span className="text-indigo-600">Article {item.article}</span>
                <span className="text-sm font-normal text-gray-500">
                  <a href={`#article-${item.article}`} className="text-indigo-400 hover:text-indigo-600">#link</a>
                </span>
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {highlightText(item.text)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 lg:py-12 flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-0">
      {/* New: Overlay for mobile when sidebar is open */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Sidebar Container */}
      <Sidebar />
      
      {/* Resizer Handle (Only visible on large screens) */}
      <div 
          className="hidden lg:block cursor-ew-resize w-2 bg-indigo-100 hover:bg-indigo-300 transition duration-150 h-[calc(100vh-150px)] sticky top-[150px] z-40"
          onMouseDown={startResizing}
          onDoubleClick={() => setSidebarWidth(300)} // Reset size on double click
          title="Drag to resize menu. Double-click to reset."
      />
      
      {/* Main Content */}
      <MainContent />
    </div>
  );
};

export default ConstitutionViewer;