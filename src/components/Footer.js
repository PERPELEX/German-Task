"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const InfoSection = () => {
  const router = useRouter();

  const handleImpressumClick = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col md:flex-row h-[200vh] bg-[#2a2a2a] text-white">
      {/* Left Side - Image */}
      <div className="flex-[5] relative">
        <Image
          src="/footerBg.jpg" // Replace with your image path
          alt="Fruits"
          layout="fill"
          objectFit="cover"
          className="rounded-none"
          priority
        />
      </div>

      {/* Right Side - Content */}
      <div className="flex flex-[3] flex-row justify-center">
        <div className="flex flex-col justify-center px-6 md:px-12 py-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">
              Allgemeine Geschäftsbedingungen
            </h2>
            <ol className="font-thin list-decimal list-inside text-sm">
              <li className="mb-4">
                <strong>Geltungsbereich:</strong> Diese Allgemeinen
                Geschäftsbedingungen gelten für alle Geschäftsbeziehungen
                zwischen uns und unseren Kunden. Maßgeblich ist jeweils die zum
                Zeitpunkt des Vertragsschlusses gültige Fassung.
              </li>
              <li className="mb-4">
                <strong>Vertragsschluss:</strong> Die Präsentation der Waren in
                unserem Online-Shop stellt kein bindendes Angebot dar. Erst die
                Bestellung einer Ware durch Sie ist ein bindendes Angebot nach §
                145 BGB. Im Falle der Annahme dieses Angebotes versenden wir an
                Sie eine Auftragsbestätigung per E-Mail innerhalb von zwei
                Werktagen.
              </li>
              <li className="mb-4">
                <strong>Preise und Zahlungsbedingungen:</strong> Alle Preise
                verstehen sich in Euro inklusive der gesetzlichen
                Mehrwertsteuer. Die Zahlung erfolgt per Vorauskasse, Kreditkarte
                oder Rechnung.
              </li>
              <li className="mb-4">
                <strong>Lieferung:</strong> Die Lieferung erfolgt innerhalb
                Wiens. Die Lieferzeit beträgt in der Regel 1-2 Werktage. Wir
                behalten uns vor, eine Teillieferung vorzunehmen, sofern dies
                für Sie zumutbar ist.
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h2 className=" font-bold mb-2">Datenschutzerklärung</h2>
            <ol className="font-thin list-decimal list-inside text-sm">
              <li className="mb-4">
                <strong>Datenschutz auf einen Blick:</strong> Allgemeine
                Hinweise Die folgenden Hinweise geben einen einfachen Überblick
                darüber, was mit Ihren personenbezogenen Daten passiert, wenn
                Sie diese Website besuchen. Personenbezogene Daten sind alle
                Daten, mit denen Sie persönlich identifiziert werden können.
              </li>
              <li className="mb-4">
                <strong>Datenerfassung auf dieser Website:</strong> Wer ist
                verantwortlich für die Datenerfassung auf dieser Website? Die
                Datenverarbeitung auf dieser Website erfolgt durch den
                Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum
                dieser Website entnehmen. Wie erfassen wir Ihre Daten? Ihre
                Daten werden zum einen dadurch erhoben, dass Sie uns diese
                mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie
                in ein Kontaktformular eingeben.
              </li>
              <li className="mb-4">
                <strong>Allgemeine Hinweise und Pflichtinformationen:</strong>
                Datenschutz Die Betreiber dieser Seiten nehmen den Schutz Ihrer
                persönlichen Daten sehr ernst. Wir behandeln Ihre
                personenbezogenen Daten vertraulich und entsprechend der
                gesetzlichen Datenschutzvorschriften sowie dieser
                Datenschutzerklärung.
              </li>
            </ol>
          </div>

          <div>
            <h2
              className=" font-bold mb-2"
              onClick={handleImpressumClick}
              style={{ cursor: "pointer" }}
            >
              Impressum
            </h2>

            <ul className="font-thin  list-inside text-sm">
              <li className="mb-4">
                <strong className="mb-2 font-medium ">
                  Angaben gemäß § 5 TMG
                </strong>
                <p>Alex am Naschmarkt GmbH </p>
                <p>Naschmarkt 1</p>
                <p>1060 Wien</p>
                <p>Österreich</p>
              </li>
              <li className="mb-4">
                <strong className="mb-2 font-bold ">Vertreten durch</strong>
                <p>Alexander Mustermann</p>
                <p>Geschäftsführer</p>
              </li>
              <li className="mb-4">
                <strong className="mb-2 font-bold ">Kontakt</strong>
                <p>Telefon: +43 1 234 567</p>
                <p>E-Mail: info@alexamnaschmarkt.at</p>
              </li>
              <li className="mb-4">
                <strong className="mb-2 font-bold ">Registereintrag</strong>
                <p>Handelsregister: Handelsgericht Wien</p>
                <p>Registernummer: FN 123456a</p>
              </li>
              <li className="mb-4">
                <strong className="mb-2 font-bold ">Umsatzsteuer-ID</strong>
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß §27 a
                  Umsatzsteuergesetz: ATU12345678
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
