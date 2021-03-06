import { useState, useEffect } from 'react';
import api from '../services/data-service';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/root-reducer';
import { CircularProgress } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

export function ImageDisplay() {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [imageBlob, setImageBlob] = useState<Blob>();
  const imageId = useSelector((state: RootState) => state.image.activeId);
  const shownNode = useSelector((state: RootState) => state.image.shownNodeId);
  const modified = useSelector((state: RootState) => state.image.modified);

  useEffect(() => {
    if (typeof imageId === 'undefined') return;
    setStatus('loading');
    setImageBlob(undefined);

    let request;
    if (typeof shownNode !== 'undefined') {
      request = api().imagesLineIdNodeIdGet({lineId: imageId, nodeId: shownNode+1, lastChange: modified});
    } else {
      request = api().imagesLineIdGet({lineId: imageId, lastChange: modified});
    }
    request.subscribe({
      next: data => {
        setImageBlob(data);
      },
      error: error => {
        setStatus('error');
      }
    });
  }, [imageId, modified, shownNode]);

  const show = typeof imageId !== 'undefined';
  return (
    <>
    {show &&
      <div style={{width: '100%'}}>
        {status === 'loading' &&
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <CircularProgress style={{margin: 'auto'}} />
        </div>}
        {status === 'error' &&
          <MuiAlert severity="error">
            Hibás kép
          </MuiAlert>}
        {imageBlob &&
          <img src={URL.createObjectURL(imageBlob)}
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
            style={status === 'loaded' ? {} : {display: 'none'}}
            alt="Current" width="100%" />}
      </div>}
    </>
  );
}