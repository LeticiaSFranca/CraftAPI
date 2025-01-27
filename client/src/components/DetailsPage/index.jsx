import styles from './DetailsPage.module.css';
import { useEffect, useState } from 'react';


function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function DetailsPage({ id, subject }) {
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const loadApiData = async () => {
            try {
                const response = await fetch(`https://craft-api.onrender.com/${subject}?id=${id}`);

                if (!response.ok) {
                    throw new Error('Falha ao buscar dados');
                }

                const data = await response.json();

                if (data?.name) {
                    data.name = removeAccents(data.name);
                }
                
                setApiData(data);
            }
            catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }

        loadApiData();
    }, [id, subject]);

    return (
        <div className={styles.container}>
            <h1 className={styles.name_details}>{apiData?.name}</h1>
            <br />
            <hr className={styles.hr_details} />
            <br />
            {subject === 'mobs' && apiData && (
                <>
                    <p><b>Tipo:</b> {apiData.type}</p>
                    <br />
                    <p><b>Função:</b> {apiData.role}</p>
                    <br />
                    <p><b>Quantidade de vida :</b> {apiData.hitPoints}</p>
                    <br />
                    <p><b>Possui na edição java?</b> {apiData.javaEdition}</p>
                    <br />
                    <p><b>Possui na edição bedrock?</b> {apiData.bedrockEdition}</p>
                    <br />
                    <p><b>Possui na edição education?</b> {apiData.educationEdition}</p>
                    <br /> 
                </>
            )}
            {subject === 'equipment' && apiData && (
                <>
                    <p><b>Tipo:</b> {apiData.type}</p>
                    <br />
                    <p><b>Função:</b> {apiData.role}</p>
                    <br />
                    <p><b>Materiais para criação:</b> {apiData.materials}</p>
                    <br />
                    <p><b>Durabilidade:</b> {apiData.durability}</p>
                    <br />
                    <p><b>Raridade:</b> {apiData.rarity}</p>
                    <br />
                    <p><b>É renovável?</b> {apiData.renewable}</p>
                    <br />
                </>
            )}
            {subject === 'ores' && apiData && (
                <>
                    <p><b>Tipo:</b> {apiData.type}</p>
                    <br />
                    <p><b>Disponível no(a)</b> {apiData.availability}</p>
                    <br />
                    <p><b>Descrição:</b> {apiData.description}</p>
                    <br />
                    <p><b>Picareta mínima para quebrar:</b> {apiData.minimumPickaxe}</p>
                    <br />
                    <p><b>Nível de resistência à explosão:</b> {apiData.explosionResistance}</p>
                    <br />
                </>
            )}
            <hr className={styles.hr_details} />
            <img src={apiData?.image} className={styles.image_details} alt={apiData?.name} />
        </div>
    );
}

export default DetailsPage;