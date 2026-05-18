-- Přidání sloupce meeting_type do tabulky reservations
ALTER TABLE reservations
ADD COLUMN meeting_type VARCHAR(20) NULL;

-- Volitelně: Přidání komentáře k sloupci (pokud databáze podporuje)
COMMENT ON COLUMN reservations.meeting_type IS 'Typ setkání: online nebo offline';

-- Volitelně: Přidání CHECK constraint pro zajištění, že hodnota je pouze 'online' nebo 'offline'
ALTER TABLE reservations
ADD CONSTRAINT check_meeting_type CHECK (meeting_type IN ('online', 'offline') OR meeting_type IS NULL);

