import styled from "styled-components";
import config from "../../../config.json";

export const StyledHeader = styled.div`
  
  background-color: ${({ theme }) => theme.backgroundLevel1};

  img {
        width: 80p;
        height: 80px;
        border-radius: 50%
    }

    .user-info{
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

export const StyledBanner = styled.div`
    height: 230px;
    background-image: url(${({bg}) => bg});
    /*background-image: url("${config.bg}");*/
`;