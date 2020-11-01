import * as React from 'react';

const useMessagesCollection = (
  db: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
) => {
  const [msgs, setMsgs] = React.useState<string[]>([]);

  React.useEffect(() => {
    db.onSnapshot((snapshot) => {
      setMsgs(snapshot.docs.map((d) => d.data().text));
    });
  }, []);

  return msgs;
};

export default useMessagesCollection;
