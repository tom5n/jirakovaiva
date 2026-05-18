-- Přidání sloupce program do tabulky reservations
ALTER TABLE reservations
ADD COLUMN program VARCHAR(255) NULL;

-- Volitelně: Přidání komentáře k sloupci (pokud databáze podporuje)
COMMENT ON COLUMN reservations.program IS 'Název vybraného programu/balíčku koučinku';

