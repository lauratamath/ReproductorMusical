---Funcion trigger para tabla useraccount
CREATE FUNCTION newManagementUsers() 
RETURNS trigger AS $$
DECLARE actualDescription text;
BEGIN
  IF OLD.type <> NEW.type AND OLD.type IS NOT NULL THEN
        actualDescription := concat(OLD.username, ' updated to ', NEW.type);
  ELSEIF NEW.username IS NOT NULL THEN
  	actualDescription :=  concat(NEW.username, ' account created');
  ELSE
  	actualDescription := concat(OLD.username, ' deleted');
  END IF;
  
  INSERT INTO updatemanagement VALUES (DEFAULT, '', actualDescription);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
---Triger al modificar tabla useraccount
CREATE TRIGGER managementUsers 
AFTER INSERT OR UPDATE OR DELETE ON useraccount
FOR EACH ROW
	EXECUTE PROCEDURE newManagementUsers();


---Eliminarlo
DROP TRIGGER managementusers ON useraccount;
DROP FUNCTION newManagementUsers;



---Funcion trigger para tabla songs
CREATE FUNCTION newManagementSongs() 
RETURNS trigger AS $$
DECLARE actualDescription text;
BEGIN
  IF (NEW.availability IS NOT NULL) AND (OLD.song IS NOT NULL) THEN
    actualDescription := concat('Song ', OLD.song, ' has been updated');
  ELSEIF NEW.song IS NOT NULL THEN
  	actualDescription :=  concat(NEW.artist, ' inserted ', NEW.song);
  ELSE
  	actualDescription := concat('deleted ', OLD.artist, ' - ', OLD.song);
  END IF;
  
  INSERT INTO updatemanagement VALUES (DEFAULT, '', actualDescription);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
---Triger al modificar tabla songs
CREATE TRIGGER managementSongs
AFTER INSERT OR UPDATE OR DELETE ON songs
FOR EACH ROW
	EXECUTE PROCEDURE newManagementSongs();

---Eliminarlo
DROP TRIGGER managementSongs ON songs;
DROP FUNCTION newManagementSongs;



---Funcion trigger para tabla albums
CREATE FUNCTION newManagementAlbums() 
RETURNS trigger AS $$
DECLARE actualDescription text;
BEGIN
  IF (NEW.availability IS NOT NULL) AND (OLD.album IS NOT NULL) THEN
    actualDescription := concat('Album ', OLD.album, ' updated availability TO ', NEW.availability);
  ELSEIF NEW.album IS NOT NULL THEN
  	actualDescription :=  concat('Album ', NEW.album, ' inserted');
  ELSE
  	actualDescription := concat('Album ', OLD.album, ' deleted ');
  END IF;
  
  INSERT INTO updatemanagement VALUES (DEFAULT, '', actualDescription);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
---Triger al modificar tabla albums
CREATE TRIGGER managementAlbums
AFTER INSERT OR UPDATE OR DELETE ON albums
FOR EACH ROW
	EXECUTE PROCEDURE newManagementAlbums();

---Eliminarlo
DROP TRIGGER managementAlbums ON albums;
DROP FUNCTION newManagementAlbums;



---Funcion trigger para tabla playlist
CREATE FUNCTION newManagementPlaylist() 
RETURNS trigger AS $$
DECLARE actualDescription text;
BEGIN
  IF (NEW.song IS NOT NULL) AND (NEW.playlistname IS NOT NULL) THEN
    actualDescription := concat('Playlist ', NEW.playlistname, ' added song ', NEW.song, ' - ', NEW.artist);
  ELSE
  	actualDescription := concat('Playlist ', OLD.playlistname, ' deleted ');
  END IF;
  
  INSERT INTO updatemanagement VALUES (DEFAULT, '', actualDescription);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
---Triger al modificar tabla playlist
CREATE TRIGGER managementPlaylist
AFTER INSERT OR UPDATE OR DELETE ON playlist
FOR EACH ROW
	EXECUTE PROCEDURE newManagementPlaylist();

---Eliminarlo
DROP TRIGGER managementPlaylist ON playlist;
DROP FUNCTION newManagementPlaylist;




---Modificar el username actual en update management
CREATE FUNCTION updateUsernameInManagement(actualUsername text)
RETURNS TABLE(idupdated integer, username varchar(10), description text, dateModifictacion timestamp with time zone) AS $$
BEGIN
	UPDATE updatemanagement SET username = actualUsername WHERE updatemanagement.username = '';
	
	RETURN QUERY SELECT * FROM updatemanagement;
END;
$$ LANGUAGE plpgsql;	

	
---Eliminarlo
DROP FUNCTION updateUsernameInManagement;