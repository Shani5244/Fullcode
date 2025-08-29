import React, { useEffect, useState } from "react";
import { getAllProviders } from "../../API/providerApi";

const ProviderList = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      const data = await getAllProviders();
      setProviders(data);
    };
    fetchProviders();
  }, []);

  return (
    <div>
      <h2>Service Providers</h2>
      {providers.length === 0 ? (
        <p>No providers available</p>
      ) : (
        <ul>
          {providers.map((provider) => (
            <li key={provider._id}>
              <strong>{provider.fullName}</strong> — {provider.serviceType}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProviderList;
